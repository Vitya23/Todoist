import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';

import { CategoriesI } from '../types/categories.interface';
import { AppState } from 'src/app/shared/services/appState.state';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient, private appState: AppState) {}
  ts: string[] = [];
  addCategory(category: CategoriesI) {
    return this.http
      .post<CategoriesI[]>('http://localhost:4200/category', category)
      .pipe(
        map((response) => {
          this.appState.categories.set(response);
        })
      );
  }
  editCategory(category: CategoriesI) {
    return this.http
      .put<CategoriesI[]>('http://localhost:4200/category', category)
      .pipe(
        map((response) => {
          this.appState.categories.set(response);
        })
      );
  }
}
