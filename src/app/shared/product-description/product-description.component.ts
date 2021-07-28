import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'server/interfaces';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  @Input() item!: IItem;

  constructor() { }

  ngOnInit(): void {
  }

}
