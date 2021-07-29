import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ICategory } from 'server/interfaces';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnChanges {
  @Input() category!: ICategory;
  categoryNames!: string[];

  constructor() { }

  ngOnChanges(): void {
    this.categoryNames = this.category?.path_from_root?.map(categ => categ.name).slice(0, 4) || [];
  }

}
