import { Component, OnInit } from '@angular/core';
import { User } from '@app/_shared/model/user';
import { UserService } from '@app/_shared/services/user.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  loading: boolean = false;
  user: User[] = [];

  constructor(private _userSrv: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this._userSrv
      .getAll()
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.user = user;
        console.log(user);
      });
  }
}
