import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SiteTitleComponent } from './header/site-title/site-title.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { NavIconComponent } from './header/navigation/nav-icon/nav-icon.component';
import { FormFilterComponent } from './header/navigation/form-filter/form-filter.component';
import { BoardComponent } from './board/board.component';
import { FooterComponent } from './footer/footer.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ArticleComponent } from './board/article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SiteTitleComponent,
    NavigationComponent,
    NavIconComponent,
    FormFilterComponent,
    BoardComponent,
    FooterComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
