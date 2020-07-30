import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from '../services/search.service'
import { NavService } from '../services/nav-service'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  // variable assigned to input box 
  searchTerm = new Subject<string>();
  constructor(private searchService: SearchService, private navService:NavService) {
    console.log('typed data')
    console.log(this.searchTerm);
    this.searchService.search(this.searchTerm)
      .subscribe(results => {
        console.log(results)
        // sending json to searchcomponent . sorting false meanins search is fired.
        let value = {}
        value['sorting'] = 'false';
        value['results'] = results
        this.navService.emitNavChangeEvent(value);
      },
      error=>{
        alert("Some error in getting data")
      });
  }


  ngOnInit(): void {
  }
  // switch case for sorting cases
  sortList(index : any){
    let value = {}
        value['sorting'] = 'true';
        console.log('in sortlist function')
        console.log(index);
    switch(index){
      case '0': 
        value['sordtByAscending'] = "true";
        console.log('in 0')
        break;
      case '1' :
        value['sortByDescending'] = "true";
        break;
      
      case '2' :
        value['sortByUpperRank'] = "true";
        break;
      
      case '3' :
        value['sortByLowerRank'] = "true";
        break;
     

    }
    console.log(value)
    this.navService.emitNavChangeEvent(value);

  }

}
