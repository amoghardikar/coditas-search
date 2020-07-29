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
  searchResults = [];
  constructor(private navService: NavService) {}
  ngOnInit(): void {
    this.subscription = this.navService
      .getNavChangeEmitter()
      .subscribe((emmittedValue) => {
        console.log('in search result');
        console.log(emmittedValue);
        if ((emmittedValue['sorting'] === 'false')) {
          this.searchResults = emmittedValue['results']['items'];
          console.log('search results')
          console.log(this.searchResults)
        } else if ((emmittedValue['sorting'] === 'true')) {
          if ((emmittedValue['sordtByAscending'] === 'true')) {
            this.sortByAscending(this.searchResults);
          } else if ((emmittedValue['sortByDescending'] === 'true')) {
            this.sortByDescending(this.searchResults);
          } else if ((emmittedValue['sortByUpperRank'] === 'true')) {
            this.sortByUpperRank(this.searchResults)
          }else if(emmittedValue['sortByLowerRank'] === 'true'){
            this.sortByLowerRank(this.searchResults);
          }
        }
      });
  }

  sortByAscending(searchList) {
    console.log('soring array list by ascending');
   this.searchResults =  this.searchResults.sort((a,b) => 0 - (a['login'] > b['login'] ? -1 : 1));
   console.log('sorted array')
   console.log(this.searchResults);
  }
  sortByDescending(searchList) {
    console.log('soring array list by descending');
    this.searchResults =  this.searchResults.sort((a,b) => 0 - (b['login'] > a['login'] ? -1 : 1));
    console.log(this.searchResults)
  }
  sortByUpperRank(searchList) {
    console.log('soring array list by upperRank');
    this.searchResults =  this.searchResults.sort((a,b) => 0 - (a['score'] > b['score'] ? -1 : 1));
    console.log(this.searchResults)
  }
  sortByLowerRank(searchList) {
    console.log('soring array list by Lowerrank');
    this.searchResults =  this.searchResults.sort((a,b) => 0 - (b['score'] > a['score'] ? -1 : 1));
    console.log(this.searchResults)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
