import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  categories!: ICategory[];
  queryParamsSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private loaderService: LoaderService,
    private store: StoreService
  ) { }

  async ngOnInit(): Promise<void> {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(queryParams => {
      if (!queryParams.search) {
        this.search = this.store.lastSearch;
        this.items = this.store.lastItems;
        this.categories = this.store.lastCategories;
        return;
      }
      this.search = queryParams.search;
      this.store.lastSearch = this.search;
      this.loaderService.loader.next(true);
      this.getData();
    });
    await this.getData();
  }

  async getData(): Promise<void> {
    const response = await this.apiService.getItems(this.search);
    this.items = response.items;
    this.store.lastItems = this.items;
    this.categories = response.categories;
    this.store.lastCategories = this.categories;
    this.loaderService.loader.next(false);
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

}
