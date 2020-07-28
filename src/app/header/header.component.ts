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
        this.navService.emitNavChangeEvent(results);
      });
  }


  ngOnInit(): void {
  }

}
