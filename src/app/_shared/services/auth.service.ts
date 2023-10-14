import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../model/user';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private _http: HttpClient, private _router: Router) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem(environment.ls_variable)!)
    );
    this.user = this.userSubject.asObservable();
  }

  get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this._http
      .post<any>(`${environment.localSrv}/users/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem(environment.ls_variable, JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem(environment.ls_variable)
    this.userSubject.next(null)
    this._router.navigate(['/auth'])
  }
}
