import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Article } from 'src/app/board/model/article';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Output() private onSetArticles: EventEmitter<Article[]>;

  constructor() {
    this.onSetArticles = new EventEmitter<Article[]>();
  }

  ngOnInit(): void {
  }

  setArticles(event: Article[]): void {
    this.onSetArticles.emit(event)
    console.log('NavCom: ', event)
  }

}
