import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchService } from './search.service'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AppRoutingModule } from './app-routing.module';
import { NavService } from './nav-service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxPaginationModule
  ],
  providers: [SearchService, NavService,HttpClientModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
