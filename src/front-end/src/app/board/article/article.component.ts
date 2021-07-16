import { Component, OnInit, Input } from '@angular/core';

import { Article } from '../model/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() public url!: string;
  @Input() public push!: number;
  @Input() public id!: string;
  @Input() public hrefs!: string[];
  @Input() public b!: Article;


  constructor() { }

  ngOnInit(): void {
  }

}
