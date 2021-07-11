import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Article } from 'src/app/board/model/article';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() private onSetArticles: EventEmitter<Article[]>;

  constructor() {
    this.onSetArticles = new EventEmitter<Article[]>();
  }

  ngOnInit(): void {
  }

  setArticles(event: Article[]): void {
    this.onSetArticles.emit(event)
    console.log('HeaderCom: ', event)
  }

}
