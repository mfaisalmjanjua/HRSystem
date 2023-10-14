import { Component, OnInit } from '@angular/core';
import { User } from '@app/_shared/model/user';
import { UserService } from '@app/_shared/services/user.service';
import { first } from 'rxjs';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  user: User;
  userFromApi?: User;

  constructor(private _authSrv: AuthService, private _userSrv: UserService) {
    this.user = <User>this._authSrv.userValue;
  }

  ngOnInit() {
    this.loading = true;
    this._userSrv
      .getById(this.user.id)
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.userFromApi = user;
        console.log(user);
      });
  }

  logout() {
    this._authSrv.logout();
  }
}
