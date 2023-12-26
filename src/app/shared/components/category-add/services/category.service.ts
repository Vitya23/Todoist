import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';

import { CategoryI } from '../types/category.interface';
import { AppState } from 'src/app/shared/services/appState.state';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient, private appState: AppState) {}
  ts: string[] = [];
  addCategory(categoryTitle: string) {
    return this.http
      .post<CategoryI[]>('http://localhost:4200/category', categoryTitle)
      .pipe(
        map((response) => {
          this.appState.categories.set(response);
        })
      );
  }
  editCategory(category: CategoryI) {
    return this.http
      .put<CategoryI[]>('http://localhost:4200/category', category)
      .pipe(
        map((response) => {
          this.appState.categories.set(response);
        })
      );
  }
}
