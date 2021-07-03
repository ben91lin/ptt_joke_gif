import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Article } from '../board/model/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  getArticles(
    order: string = 'DESC',
    before: string | null = null,
    after: string | null = null,
    push: string | null = null,
    skip: string = '0'
  ) :Observable<Article[]> {
    let httpParams = new HttpParams();
    let params = {
      before: before,
      after: after,
      push: push,
      skip: skip
    }

    for (let param of Object.entries(params)) {
      if (param[1]) {
        httpParams = httpParams.set(param[0], param[1]);
      }
    }

    return this.http.get<Article[]>(
      `/api/jokes/${order}/`, 
      {
        params: httpParams
      }
    );
  }
}
