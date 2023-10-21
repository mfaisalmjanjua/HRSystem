import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Root, User } from '@app/_shared/model/user';
import { UserService } from '@app/_shared/services/user.service';
import { delay, first, map } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  loading: boolean = true;
  totalContacts: number;
  users: Root[] = [];
  addFrm: FormGroup;

  addNewCol: boolean = true;
  onEdit: boolean = false;
  editID: number;

  constructor(
    private _userSrv: UserService,
    private _router: Router,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.frm();
  }

  loadData() {
    this._userSrv
      .getAll()
      .pipe(first(), delay(1000))
      .subscribe({
        next: (x: any) => {
          this.loading = false;
          this.totalContacts = x.total;

          this.users = x.users as Root[];
          this.users;
        },
        error: (err) => {},
      });
  }

  profile(id: number) {
    // this._router.navigate(['/profile', id]);
    this.onEdit = true;
    this.addNewCol = true;
    this.editID = id;
    this._userSrv.getById(id).subscribe({
      next: (res) => {
        console.log(this.users)
        this.addFrm.patchValue({
          email: res.email,
        });
      },
    });
    console.log(id);
  }

  addNew() {
    this.addNewCol = true;
    console.log('add new');
  }

  frm() {
    this.addFrm = this._fb.group({
      email: ['a', Validators.email],
    });
  }

  onSubmit() {
    this._userSrv
      .updateByID(this.editID)
      .pipe(first())
      .subscribe({
        next: (x) => {
          const index = this.users.map((i) => i.id).indexOf(this.editID);
          this.users[index].email = x.email;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateData(index: number, user: any) {
    return user.id;
    console.log(index, user, 'trackby');
  }
}
