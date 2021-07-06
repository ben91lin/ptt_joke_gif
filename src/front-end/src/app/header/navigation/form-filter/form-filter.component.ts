import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

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

  public filterForm!: FormGroup;
  public orderRadio: string;

  constructor(
    private fb: FormBuilder
  ) {
    this.createFilterForm();
    this.orderRadio = this.filterForm!.value.order;
  }

  ngOnInit(): void {
  }

  createFilterForm(): void {
    this.filterForm!  = this.fb.group({
      order: 'DESC',
      push: [0, [Validators.required, Validators.min(0), Validators.max(200)]],
      before: null,
      after: null
    });
  }

  switchOrderRadio(): void {
    this.orderRadio = this.filterForm!.value.order
  }

  test(): void {
    console.log('test')
    console.log(this.filterForm!)
  }

}
