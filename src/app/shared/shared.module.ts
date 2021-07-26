import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [
    SearchBoxComponent,
    ProductComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    SearchBoxComponent,
    ProductComponent
  ]
})
export class SharedModule { }
