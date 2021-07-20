import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public copyright: string

  constructor() {
    this.copyright = 'Copyright © 2021 Aben. All rights reserved.'
  }

  ngOnInit(): void {
  }

}
