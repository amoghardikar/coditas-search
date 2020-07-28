import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from './search.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coditas-search-assignment';
  results: Object;
  searchTerm$ = new Subject<string>();
  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        console.log(results)
        //this.results = results['results'];
        //console.log(this.results)
      });
  }

}
