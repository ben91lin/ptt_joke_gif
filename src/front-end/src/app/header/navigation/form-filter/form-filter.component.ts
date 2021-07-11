import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Article } from '../../../board/model/article';
import { ArticleService } from '../../../services/article.service';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.css'],
  animations: [
    trigger(
      'orderRadio',
      [
        state(
          'active',
          style({
            'background-color': 'rgba(248, 113, 113, 1)',
            'color': 'rgba(255, 255, 255, 1)'
          })
        ),
        state(
          'inactive',
          style({
            'background-color': 'rgba(255, 255, 255, 1)',
            'color': 'rgba(248, 113, 113, 1)'
          })
        ),
        transition(
          'active => inactive',
          [animate('150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)')]
        ),
        transition(
          'inactive => active',
          [animate('150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)')]
        )
      ]
    )
  ]
})
export class FormFilterComponent implements OnInit {

  public filterForm: FormGroup;
  public orderRadio: string;
  @Output() private onGetArticles: EventEmitter<Article[]>;

  constructor(
    private as: ArticleService,
    private fs: FormService
  ) {
    this.onGetArticles = new EventEmitter<Article[]>();
    this.filterForm = this.fs.createFilter();
    this.orderRadio = this.fs.filterValue().order;
    this.getArticles();
  }

  ngOnInit(): void {
  }

  switchOrderRadio(): void {
    this.orderRadio = this.fs.filterValue().order;
  }

  getArticles(): void {
    this.as.getArticles(
      this.fs.query()
    ).subscribe(
      (articles: Article[]) => {
        this.onGetArticles.emit(articles)
        console.log('Filter Cons:', articles)
      }
    );
  }
}