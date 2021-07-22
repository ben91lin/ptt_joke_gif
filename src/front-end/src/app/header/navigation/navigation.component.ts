import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

import { FormService } from '../../services/form.service';
import { Article } from 'src/app/board/model/article';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Output() private onSetFormService: EventEmitter<FormService>;
  @Output() private onSetArticles: EventEmitter<Article[]>;
  public isOpen: Boolean;

  constructor(
    public ele: ElementRef
  ) {
    this.onSetFormService = new EventEmitter<FormService>();
    this.onSetArticles = new EventEmitter<Article[]>();
    this.isOpen = false;
  }

  ngOnInit(): void {
  }

  setIsOpen(event: Boolean):void {
    this.isOpen = event;
  }

  setFormService(event: FormService): void {
    this.onSetFormService.emit(event)
    console.log('NavCom: ', event)
  }

  setArticles(event: Article[]): void {
    this.onSetArticles.emit(event)
    console.log('NavCom: ', event)
  }
}
