import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authSrv: AuthService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this._authSrv.userValue;
    if (user) {
      // check if route is restricted by role
      const { roles } = route.data;
      if (roles && !roles.includes(user.role)) {
        // role not authorized so redirect to home page
        this._router.navigate(['/']);
        return false;
      }

      // authorized so return true
      return true;
    }

    this._router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
