import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ProductComponent } from './product/product.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SearchBoxComponent,
    ProductComponent,
    BreadcrumbsComponent
  ],
  exports: [
    CommonModule,
    SearchBoxComponent,
    ProductComponent,
    BreadcrumbsComponent
  ]
})
export class SharedModule { }
