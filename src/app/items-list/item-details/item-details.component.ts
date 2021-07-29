import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IItem } from 'server/interfaces';
import { ApiService } from 'src/app/core/api.service';
import { LoaderService } from 'src/app/shared';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  item!: IItem;
  itemId!: string;
  paramMapSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute, private apiService: ApiService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(params => { 
        this.itemId = params.get('id') as string;
        this.loaderService.loader.next(true);
        this.getItemById();
    });
  }

  async getItemById(): Promise<void> {
    const res = await this.apiService.getItemById(this.itemId);
    this.item = res?.item;
    this.loaderService.loader.next(false);
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }

}
