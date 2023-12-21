import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoAddService {
  constructor(private http: HttpClient) {}
}
