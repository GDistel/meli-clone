import { NgModule } from '@angular/core';

import { ItemsListRoutingModule } from './items-list-routing.module';
import { ItemsListComponent } from './items-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ItemsListComponent,
    ItemDetailsComponent
  ],
  imports: [
    SharedModule,
    ItemsListRoutingModule
  ]
})
export class ItemsListModule { }
