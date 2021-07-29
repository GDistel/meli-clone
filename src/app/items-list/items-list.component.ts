import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory, IItem } from 'server/interfaces';
import { ApiService } from '../core/api.service';
import { StoreService } from '../core/store.service';
import { LoaderService } from '../shared';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, OnDestroy {
  search!: string;
  items!: IItem[];
  category!: ICategory;
  queryParamsSubscription!: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private loaderService: LoaderService,
    private store: StoreService
  ) { }

  async ngOnInit(): Promise<void> {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(queryParams => {
      const searchTerm: string = queryParams.search;
      if (!searchTerm) {
        this.search = this.store.lastSearch;
        this.items = this.store.lastItems;
        this.category = this.store.lastCategory;
        return;
      }
      if (this.searchTermIsProductId(searchTerm)) {
        // The user provided the id of a specific Product
        this.router.navigate([searchTerm.toUpperCase()], { relativeTo: this.activatedRoute });
        return;
      }
      this.search = searchTerm;
      this.store.lastSearch = searchTerm;
      this.loaderService.loader.next(true);
      this.getData();
    });
    await this.getData();
  }

  async getData(): Promise<void> {
    const response = await this.apiService.getItems(this.search);
    this.items = response.items;
    this.store.lastItems = this.items;
    this.category = response.category;
    this.store.lastCategory = this.category;
    this.loaderService.loader.next(false);
  }

  searchTermIsProductId(searchTerm: string): boolean {
    return searchTerm.startsWith('mla');
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

}
