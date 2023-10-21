import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Root } from '@app/_shared/model/user';
import { UserService } from '@app/_shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {


  private profileIdSub: Subscription;
  user: Root[]=[];
  id: number;

  constructor(
    private _userSrv: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.extractID();
  }

  ngOnInit(): void {}

  extractID() {
    this.profileIdSub = this._route.params.subscribe((res) => {
      this.id = res['id'];
      this._userSrv.getById(res['id']).subscribe({
        next: (e:any) => {
          this.user.push(e);
        },
        error: (err) => {},
      });
    });
  }

  ngOnDestroy(): void {
    this.profileIdSub.unsubscribe();
  }
}
