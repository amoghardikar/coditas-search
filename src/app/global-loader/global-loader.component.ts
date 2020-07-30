import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service'

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.css']
})
export class GlobalLoaderComponent implements OnInit {
  loading: boolean;

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading.subscribe((result) => {
      console.log(result);
      this.loading = result;
    });

  }

  ngOnInit(): void {
  }

}
