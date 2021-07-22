import { Component, OnInit, Output, QueryList, ViewChildren, ElementRef, EventEmitter, HostListener } from '@angular/core';

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
  public isFixed: boolean;

  constructor() {
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
    if (this.isFixed) {
      if (window.innerWidth > 1533.8) {
        return {
          "position": "fixed",
          "width": "50%",
          "margin-top": "0"
        }
      } else {
        return {
          "position": "fixed",
          "width": "calc(100% - 1rem)",
          "margin-top": "0"
        }
      }
    } else {
      return {}
    }
  }

  setFixedPaddingBottom(): Object {
    if (this.isFixed) {
      if (window.innerWidth > 1533.8) {
        return {
          "padding-bottom": "104px"
        }
      } else {
        return {
          "padding-bottom": "80px"
        }
      }
    } else {
      return {}
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
