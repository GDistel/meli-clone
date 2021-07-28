import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IItem } from 'server/interfaces';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  item!: IItem;
  itemId!: string;
  paramMapSubscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(params => { 
        this.itemId = params.get('id') as string;
        this.getItemById();
    });
  }

  async getItemById(): Promise<void> {
    this.item = await this.apiService.getItemById(this.itemId);
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }

}
