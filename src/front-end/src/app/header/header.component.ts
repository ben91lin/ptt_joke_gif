import { Component, OnInit, Output, QueryList, ViewChildren, ElementRef, EventEmitter, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Article } from 'src/app/board/model/article';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChildren('appNavigation', {read: ElementRef}) appSiteTitle!: QueryList<ElementRef>;
  @Output() private onSetFormService: EventEmitter<FormService>;
  @Output() private onSetArticles: EventEmitter<Article[]>;
  public isFixed!: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    this.onSetFormService = new EventEmitter<FormService>();
    this.onSetArticles = new EventEmitter<Article[]>();
    this.isFixed = false;
  }

  ngOnInit(): void { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let elePos = this.appSiteTitle.toArray()[0].nativeElement.offsetTop;
    let scrollPos = window.pageYOffset;
    if (scrollPos > elePos) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }
  }

  setFixedStyles(): Object {
    return {
      "position": this.isFixed ? "fixed" : "",
      "width": this.isFixed ? "50%" : "",
      "margin-top": this.isFixed ? "0" : ""
    }
  }

  setFormService(event: FormService): void {
    this.onSetFormService.emit(event)
    console.log('HeaderCom: ', event)
  }

  setArticles(event: Article[]): void {
    this.onSetArticles.emit(event)
    console.log('HeaderCom: ', event)
  }

}
