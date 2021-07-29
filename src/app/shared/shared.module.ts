import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ProductComponent } from './product/product.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { RouterModule } from '@angular/router';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SearchBoxComponent,
    ProductComponent,
    BreadcrumbsComponent,
    BackButtonComponent,
    ProductDescriptionComponent,
    LoaderComponent
  ],
  exports: [
    CommonModule,
    SearchBoxComponent,
    ProductComponent,
    BreadcrumbsComponent,
    BackButtonComponent,
    ProductDescriptionComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
