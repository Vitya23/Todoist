import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChangeStatusI } from '../types/changeStatus.interface';
import { HttpClient } from '@angular/common/http';
import { RequestPath } from 'src/app/shared/enums/path.enum';

@Injectable()
export class TodoStatusService {
  constructor(private http: HttpClient) {}

  changeStatus(status: ChangeStatusI) {
    return this.http.post(environment.apiUrl + RequestPath.STATUS, status);
  }
}
