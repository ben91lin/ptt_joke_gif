import { Component, OnInit, Input } from '@angular/core';

import { Article } from '../board/model/article';
import { ArticleService } from '../services/article.service';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() public fs!: FormService;
  @Input() public articles!: Article[];

  constructor(
    public as: ArticleService
  ) { }

  ngOnInit(): void {
  }

  onScrollDown() {
    console.log('onScrollDown')
    this.fs.skip++;
    this.getArticles()
  }

  getArticles(): void {
    this.as.getArticles(
      this.fs.query()
    ).subscribe(
      (articles: Article[]) => {
        this.articles = this.articles.concat(articles)
      }
    );
  }
}
