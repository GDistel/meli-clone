import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IItem } from 'server/interfaces';
import { ApiService } from '../core/api.service';
import { LoaderService } from '../shared';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, OnDestroy {
  search!: string;
  items!: IItem[];
  categories!: string[];
  queryParamsSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute, private apiService: ApiService, private loaderService: LoaderService
  ) { }

  async ngOnInit(): Promise<void> {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.search) {
        this.search = queryParams.search;
        this.loaderService.loader.next(true);
        this.getData();
      }
    });
    await this.getData();
  }

  async getData(): Promise<void> {
    const response = await this.apiService.getItems(this.search);
    this.items = response.items;
    this.categories = response.categories;
    this.loaderService.loader.next(false);
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

}
