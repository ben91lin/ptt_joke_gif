import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-icon',
  templateUrl: './nav-icon.component.html',
  styleUrls: ['./nav-icon.component.css']
})
export class NavIconComponent implements OnInit {

  @Output() private onIsOpen: EventEmitter<Boolean>;
  public isOpen: boolean;

  constructor() {
    this.onIsOpen = new EventEmitter<Boolean>();
    this.isOpen = false;
  }

  ngOnInit(): void {
  }

  onToggleIsOpen(): void {
    this.isOpen = !this.isOpen
    this.onIsOpen.emit(this.isOpen)
  }
}
