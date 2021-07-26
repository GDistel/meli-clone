import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Meli clone';
  searchTerm!: string;

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }
}
