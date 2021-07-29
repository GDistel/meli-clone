import { Injectable } from '@angular/core';
import { ICategory, IItem } from 'server/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  lastSearch!: string;
  lastItems!: IItem[];
  lastCategories!: ICategory[];

  constructor() { }

}
