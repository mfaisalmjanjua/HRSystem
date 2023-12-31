import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  lgFrm!: FormGroup;
  submitted: boolean = false;
  error: string = '';
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authSrv: AuthService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.frm();
  }

  frm() {
    this.lgFrm = this._fb.group({
      username: new FormControl('admin'),
      password: new FormControl('admin'),
    });
  }

  //
  get f() {
    return this.lgFrm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.lgFrm.invalid) return;

    this.loading = true;
    this._authSrv
      .login(this.f['username'].value, this.f['password'].value)
      .subscribe({
        next: () => {
          this.submitted = false;
          this.loading = false;
          const returnUrl =
            this._route.snapshot.queryParams['returnUrl'] || '/';
          this._router.navigate([returnUrl]);
        },
        error: (err) => {
          console.log(err);
          this.error = err;
          this.loading = false;
        },
      });
  }
}
