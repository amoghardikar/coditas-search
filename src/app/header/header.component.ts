import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from '../search.service'
import { NavService } from '../nav-service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  results: Object;
  searchTerm$ = new Subject<string>();
  @Output()
  change: EventEmitter<{}> = new EventEmitter<{}>();
  constructor(private searchService: SearchService, private navService:NavService) {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        console.log(results)
        //this.results = results['results'];
        //console.log(this.results)
        let value = {}
        value['sorting'] = 'false';
        value['results'] = results
        this.navService.emitNavChangeEvent(value);
      });
  }


  ngOnInit(): void {
  }
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
