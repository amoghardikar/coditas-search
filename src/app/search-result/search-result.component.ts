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
  totalCounts = 0;
  pageNumber: number = 1
  repoApiSuccess =  false;
  constructor(private navService: NavService, private searchService: SearchService) {}
  ngOnInit(): void {
    this.subscription = this.navService
      .getNavChangeEmitter()
      .subscribe((emmittedValue) => {
        console.log('in search result');
        console.log(emmittedValue);
        if (emmittedValue['sorting'] === 'false') {
          this.searchResults = emmittedValue['results']['items'];
          this.totalCounts = this.searchResults.length;
          console.log('search results');
          console.log(this.searchResults);
          this.searchResults.forEach((element) => {
            element['showDetails'] = 'false';
            element['repos'] = [];
            element['buttonText'] = 'Details'
          });
        } else if (emmittedValue['sorting'] === 'true') {
          if (emmittedValue['sordtByAscending'] === 'true') {
            this.sortByAscending(this.searchResults);
          } else if (emmittedValue['sortByDescending'] === 'true') {
            this.sortByDescending(this.searchResults);
          } else if (emmittedValue['sortByUpperRank'] === 'true') {
            this.sortByUpperRank(this.searchResults);
          } else if (emmittedValue['sortByLowerRank'] === 'true') {
            this.sortByLowerRank(this.searchResults);
          }
        }
      });
  }

  sortByAscending(searchList) {
    console.log('soring array list by ascending');
    this.searchResults = this.searchResults.sort(
      (a, b) => 0 - (a['login'] > b['login'] ? -1 : 1)
    );
    console.log('sorted array');
    console.log(this.searchResults);
  }
  sortByDescending(searchList) {
    console.log('soring array list by descending');
    this.searchResults = this.searchResults.sort(
      (a, b) => 0 - (b['login'] > a['login'] ? -1 : 1)
    );
    console.log(this.searchResults);
  }
  sortByUpperRank(searchList) {
    console.log('soring array list by upperRank');
    this.searchResults = this.searchResults.sort(
      (a, b) => 0 - (a['score'] > b['score'] ? -1 : 1)
    );
    console.log(this.searchResults);
  }
  sortByLowerRank(searchList) {
    console.log('soring array list by Lowerrank');
    this.searchResults = this.searchResults.sort(
      (a, b) => 0 - (b['score'] > a['score'] ? -1 : 1)
    );
    console.log(this.searchResults);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  showDetails(searchResultObj) {
    
    if (searchResultObj['showDetails'] == 'false') {
      searchResultObj['showDetails'] = 'true';
      searchResultObj['buttonText'] = 'Collpase'
    } else {
      searchResultObj['showDetails'] = 'false';
      searchResultObj['buttonText'] = 'Details'
    }

    this.searchService.getRepos(searchResultObj['login']).subscribe((res)=> {
      console.log('get repo res');
      console.log(res)
      this.repoApiSuccess = true;
      searchResultObj['repos'] = res;
      
    },
    err=> {
      alert("Some error in getting repositories")
    })
  }
}
