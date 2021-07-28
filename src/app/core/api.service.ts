import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getItems(searchTerm: string): Promise<any> {
    return this.http.get<any>(`/api/items?searchTerm=${searchTerm}`).toPromise();
  }

  getItemById(id: string): Promise<any> {
    return this.http.get<any>(`/api/items/${id}`).toPromise();
  }

}
