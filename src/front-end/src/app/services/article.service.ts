import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Article } from '../board/model/article';
import { Filterable } from '../header/navigation/form-filter/model/form-filter';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  getArticles(
    formFilter: Filterable = {
      order: 'DESC',
      sortby: 'timestamp',
      before: '',
      after: '',
      push: 0,
      skip: 0
    }
  ) :Observable<Article[]> {
    let httpParams = new HttpParams();

    for (let param of Object.entries(formFilter)) {
      if (param[1]) {
        httpParams = httpParams.set(param[0], param[1].toString());
      }
    }

    return this.http.get<Article[]>(
      '/api/jokes/', 
      {
        params: httpParams
      }
    );
  }
}
