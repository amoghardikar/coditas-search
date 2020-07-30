import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from '../services/search.service';
import { NavService } from '../services/nav-service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  subscription: any;
  searchResults = [];
  totalCounts = 0;
  pageNumber: number = 1;
  repoApiSuccess = false;
  constructor(
    private navService: NavService,
    private searchService: SearchService
  ) {}
  ngOnInit(): void {
    // assigning subscription so whenever user searches, this will recieve the search response.
    this.subscription = this.navService
      .getNavChangeEmitter()
      .subscribe((emmittedValue) => {
        console.log('in search result');
        console.log(emmittedValue);
        // checking whether sort is fired, or search operation is fired from header compoenent
        if (emmittedValue['sorting'] === 'false') {
          this.searchResults = emmittedValue['results']['items'];
          this.totalCounts = this.searchResults.length;
          console.log('search results');
          console.log(this.searchResults);
          // assigning custom properties to search elements as we have to identify which array element is clicked for showing details . It should be global
          this.searchResults.forEach((element) => {
            element['showDetails'] = 'false';
            element['repos'] = [];
            element['buttonText'] = 'Details';
          });
        } // meaning sort is fired from header compoenent
        else if (emmittedValue['sorting'] === 'true') {
          if (emmittedValue['sordtByAscending'] === 'true') {
            this.sortByAscending();
          } else if (emmittedValue['sortByDescending'] === 'true') {
            this.sortByDescending();
          } else if (emmittedValue['sortByUpperRank'] === 'true') {
            this.sortByUpperRank();
          } else if (emmittedValue['sortByLowerRank'] === 'true') {
            this.sortByLowerRank();
          }
        }
      });
  }

  sortByAscending() {
    console.log('soring array list by ascending');
    this.searchResults = this.searchResults.sort(
      (firstElement, secondElement) =>
        0 - (firstElement['login'] > secondElement['login'] ? -1 : 1)
    );
    console.log('sorted array');
    console.log(this.searchResults);
  }
  sortByDescending() {
    console.log('soring array list by descending');
    this.searchResults = this.searchResults.sort(
      (firstElement, secondElement) =>
        0 - (secondElement['login'] > firstElement['login'] ? -1 : 1)
    );
    console.log(this.searchResults);
  }
  sortByUpperRank() {
    console.log('soring array list by upperRank');
    this.searchResults = this.searchResults.sort(
      (firstElement, secondElement) =>
        0 - (firstElement['score'] > secondElement['score'] ? -1 : 1)
    );
    console.log(this.searchResults);
  }
  sortByLowerRank() {
    console.log('soring array list by Lowerrank');
    this.searchResults = this.searchResults.sort(
      (firstElement, secondElement) =>
        0 - (secondElement['score'] > firstElement['score'] ? -1 : 1)
    );
    console.log(this.searchResults);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // called when details button cliked and recieved the object
  showDetails(searchResultObj) {
    // doing show hide of button and changing of button text
    if (searchResultObj['showDetails'] == 'false') {
      searchResultObj['showDetails'] = 'true';
      searchResultObj['buttonText'] = 'Collpase';
    } else {
      searchResultObj['showDetails'] = 'false';
      searchResultObj['buttonText'] = 'Details';
    }
    // api to get repositories for the user
    // calling api when show details is true
    if (searchResultObj['showDetails'] === 'true') {
      this.searchService.getRepos(searchResultObj['login']).subscribe(
        (res) => {
          console.log('get repo res');
          console.log(res);
          this.repoApiSuccess = true;
          searchResultObj['repos'] = res;
          // checking if there is no languages for repository. 
          // also avoiding displaying blank value. Showing 'NA' if there is no value.
          searchResultObj['repos'].forEach((element) => {
            if (element['language'] === null) {
              element['language'] = 'NA';
            }
          });
         
        },
        (err) => {
          alert('Some error in getting repositories');
        }
      );
    }
  }
}
