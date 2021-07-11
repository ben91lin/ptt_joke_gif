import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Filterable } from '../header/navigation/form-filter/model/form-filter';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public filterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  createFilter(): FormGroup {
    this.filterForm! = this.fb.group({
      order: 'DESC',
      push: [0, [Validators.required, Validators.min(0), Validators.max(99)]],
      before: '',
      after: ''
    });
    return this.filterForm!
  }

  filterValue(): Filterable {
    return this.filterForm!.value
  }

  query(): Filterable {
    var query = this.filterForm!.value
    query = this._dateToTimestamp(query)
    return query
  }

  _dateToTimestamp(query: Filterable) {
    type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];
    type k = KeysMatching<Filterable, String>
    const keys: k[] = ['before', 'after']

    for (let k of keys) {
        if (query[k]) {
          query[k] = String(new Date(query[k]).getTime())
        }
    }

    return query
  }
}
