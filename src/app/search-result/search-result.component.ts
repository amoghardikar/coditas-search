import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from '../search.service';
import { NavService } from '../nav-service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  subscription: any;
  constructor(private navService: NavService) {}
  ngOnInit(): void {
    this.subscription = this.navService
      .getNavChangeEmitter()
      .subscribe((results) => {
        console.log('in search result');
        console.log(results);
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
