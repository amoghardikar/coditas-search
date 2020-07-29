import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { debounceTime,  } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Constants } from '../Constants'

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  search(terms: Observable<string>) {
    return  terms
  .pipe(debounceTime(800),
        distinctUntilChanged(),
        switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term) {
    return this.http
        .get(Constants.HOST +'search/users?q='+ term)
  }
  getRepos(username){
    return this.http.get(Constants.HOST +'users/'+ username + '/repos')
  }
}