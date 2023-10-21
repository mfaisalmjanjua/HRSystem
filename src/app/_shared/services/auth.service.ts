import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Observer,
  catchError,
  delay,
  dematerialize,
  map,
  materialize,
  observable,
  of,
  throwError,
} from 'rxjs';
import { User } from '../model/user';

import { config } from '@environments/config'
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
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


  ok(body: any) {
    return of({
      status: 200,
      body,
    });
  }

  login(user: string, password: string) {
    return this._http.get(`${environment.localDB}/users`).pipe(
      map((users: any) => {
        return users.find((x: any) => {
          console.log(x);
        });
      }),
      catchError((x) => {
        console.log(x, "yahoooooo")
        return throwError(()=>{
          return "errr1"
        })
      })
    );
  }

  // login(username: string, password: string) {
  //   return this._http.get(`${environment.localDB}/users`).pipe(
  //     map((users: any) => {
  //       const user = users.filter(
  //         (x: any) => x.username === username && x.password === password
  //       );
  //       return user;
  //     })
  //   );

  // return this._http
  //   .post<any>(`${environment.localSrv}/users/authenticate`, {
  //     username,
  //     password,
  //   })
  //   .pipe(
  //     map((user) => {
  //       localStorage.setItem(environment.ls_variable, JSON.stringify(user));
  //       this.userSubject.next(user);
  //       return user;
  //     })
  //   );
  // }

  logout() {
    localStorage.removeItem(environment.ls_variable);
    this.userSubject.next(null);
    this._router.navigate(['/auth']);
  }
}
