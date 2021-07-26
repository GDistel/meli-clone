import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Meli clone';

  constructor(private router: Router) {}

  onSearch(searchTerm: string): void {
    this.router.navigate(['items'], { queryParams: { search: searchTerm } });
  }

}
