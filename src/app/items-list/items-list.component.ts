import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { IItem } from 'server/interfaces';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, OnDestroy {
  search!: string;
  items!: IItem[];
  categories!: string[];
  loading = false;
  queryParamsSubscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.search) {
        this.search = queryParams.search;
        this.loading = true;
        this.getData();
      }
    });
    await this.getData();
  }

  async getData(): Promise<void> {
    const response = await this.apiService.getItems(this.search);
    this.items = response.items;
    this.categories = response.categories;
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

}
