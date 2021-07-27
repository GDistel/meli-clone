import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem } from 'server/interfaces';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  search!: string;
  items!: IItem[];

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.search) {
        this.search = queryParams.search;
      }
    });
    const response = await this.apiService.getItems(this.search);
    this.items = response.items;
  }

}
