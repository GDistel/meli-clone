import { Component, OnInit } from '@angular/core';
import { LoaderService } from '..';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  load = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.loader.subscribe((load: boolean) => this.load = load);
  }

}
