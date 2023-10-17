import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
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
    return this._http.get(`${environment.localDB}/users`).pipe(
      map((users: any) => {
        const user = users.find(
          (x: any) => x.username === username && x.password === password
        );

        if (!user) throw { message: 'Incorrrect username or password' };

        //
        delete user.password;

        localStorage.setItem(environment.ls_variable, JSON.stringify(user));
        this.userSubject.next(user);

        return this.ok(user);
      })
    );

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
  }

  ok(body: any) {
    return of({
      status: 200,
      body,
    });
  }

  logout() {
    localStorage.removeItem(environment.ls_variable);
    this.userSubject.next(null);
    this._router.navigate(['/auth']);
  }
}
