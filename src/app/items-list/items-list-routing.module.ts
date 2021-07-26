import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemsListComponent } from './items-list.component';

const routes: Routes = [
  { path: '', component: ItemsListComponent },
  { path: ':id', component: ItemDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsListRoutingModule { }
