import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { CategoryI } from '../types/category.interface';
import { AppState } from 'src/app/shared/services/appState.state';
import { environment } from 'src/environments/environment';
import { AddCategoryI } from '../types/category.interface';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient, private appState: AppState) {}
  addCategory(category: AddCategoryI): Observable<void> {
    return this.http
      .post<CategoryI[]>(environment.apiUrl + 'category', category)
      .pipe(
        map((response) => {
          this.appState.categories.set(response);
        })
      );
  }

  editCategory(category: CategoryI): Observable<void> {
    return this.http
      .put<CategoryI[]>(environment.apiUrl + 'category', category)
      .pipe(
        map((response) => {
          this.appState.categories.set(response);
        })
      );
  }
}
