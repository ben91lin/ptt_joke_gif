import { Component } from '@angular/core';

import { Article } from 'src/app/board/model/article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';

  public articles!: Article[];

  constructor() { }

  setArticles(event: Article[]): void {
    this.articles = event;
    console.log('AppCom: ', event)
  }

}
