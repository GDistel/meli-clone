import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Output() search = new EventEmitter<string>();
  searchTerm!: string;

  onSearchTermChanged(keyupEvent: Event): void {
    const newSearchTerm = (keyupEvent?.target as HTMLInputElement).value;
    const cleanedSearchTerm = newSearchTerm.trim().toLowerCase();
    this.searchTerm = cleanedSearchTerm;
  }

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  onFormSubmit(event: Event): void {
    event.preventDefault();
    this.onSearch();
  }

}
