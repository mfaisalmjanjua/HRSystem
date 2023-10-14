import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _authSrv: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this._authSrv.logout()
  }
}
