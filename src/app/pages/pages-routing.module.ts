import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { AuthComponent } from './component/auth/auth.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from '../_shared/guard/auth.guard';
import { AdminComponent } from './component/admin/admin.component';

import { Role } from '../_shared/model/role';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
      },
    ],
  },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
