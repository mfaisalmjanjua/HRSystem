import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getAll() {
    return this._http.get<User[]>(`${environment.localSrv}/users`);
  }

  getById(id: number) {
    return this._http.get<User>(`${environment.localSrv}/users/${id}`);
  }
}
