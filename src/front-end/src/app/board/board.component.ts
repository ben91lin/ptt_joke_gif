import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Article } from './model/article';
import { ArticleService } from '../services/article.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public articles!: Article[]

  constructor(
    private ArticleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.ArticleService.getArticles().subscribe(
      (articles: Article[]) => {
        this.articles! = articles
        console.log(this.articles!)
      }
    );
    console.log(this.articles!)
  }

  getArticles(): void {
    this.ArticleService.getArticles().subscribe(
      (articles: Article[]) => {
        this.articles! = articles
      }
    );
  }
}
