import { Component, OnInit, Input } from '@angular/core';

import { Article } from '../board/model/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() public articles!: Article[];

  constructor(
    public as: ArticleService
  ) { }

  ngOnInit(): void {
  }
}
