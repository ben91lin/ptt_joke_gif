import { Component } from '@angular/core';

import { FormService } from './services/form.service';
import { Article } from 'src/app/board/model/article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';

  public fs!: FormService;
  public articles!: Article[];

  constructor() { }

  setFormService(event: FormService): void {
    this.fs = event
    console.log('AppCom: ', event)
  }

  setArticles(event: Article[]): void {
    this.articles = event;
    console.log('AppCom: ', event)
  }

}
