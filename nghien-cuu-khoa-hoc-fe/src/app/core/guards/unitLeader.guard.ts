import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OAuth2Service } from '../services/auth/oauth2.service';
@Injectable({
  providedIn: 'root'
})
export class UnitLeaderGuard implements CanActivate {
  constructor(
    private authService: OAuth2Service
  ) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    try {
      if (this.authService.getAuthData()) {
        if (this.authService.checkRole(SystemConstant.ROLE_USER.ROLE_TRUONG_DON_VI)) {
          return of(true);
        }
      }
      return of(false);
    } catch (error) {
      return of(false);
    }
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | Observable<boolean>> {
    return this.canActivate(route, state);
  }
}
