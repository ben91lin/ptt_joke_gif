import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() public url!: string;
  @Input() public push!: number;
  @Input() public timestamp!: number;
  @Input() public id!: string;
  @Input() public hrefs!: string[];

  constructor() { }

  ngOnInit(): void {
  }

  isImg(href: string): boolean {
    return ['gif', 'jpg'].includes(href.slice(-3))
  }

  isVideo(href: string): boolean {
    return ['mp4'].includes(href.slice(-3))
  }

  toDateTime(timestamp: number): string {
    return new Date(timestamp * 1000).toString()
  }
}
