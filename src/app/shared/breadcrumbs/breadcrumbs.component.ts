import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ICategory } from 'server/interfaces';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnChanges {
  @Input() categories!: ICategory[];
  categoryNames!: string[];

  constructor() { }

  ngOnChanges(): void {
    this.categoryNames = this.categories.map(categ => categ.name).slice(0, 1);
  }

}
