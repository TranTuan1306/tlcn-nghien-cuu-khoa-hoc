/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SystemConstant } from '../../constants/system.constant';
import { UrlConstant } from '../../constants/url.constant';
import { Oauth2Config } from '../../models/oauth2/oauth2-config.model';
import { OAuth2, UserGoogle, OAuth2User, UserInfo, RoleUser } from '../../models/oauth2/oauth2.interface';
import { HandlerErrorService } from '../common/handler-error.service';

/*OAuth2User*/
@Injectable()
export class OAuth2Service {

  public onCredentialUpdated$: Subject<OAuth2>;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService,
  ) { }

  getAccessToken(
    googleToken: string,
    config: Oauth2Config
  ): Observable<OAuth2> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          `Basic ` + btoa(`${config.client}:${config.secret}`)
      })
    };

    const params: string = [
      `grant_type=google_grant_type`,
      `google_token=${googleToken}`
    ].join('&');

    return this.http.post<OAuth2>(
      `${UrlConstant.API.OAUTH2.GET_ACCESS_TOKEN}?${params}`
      , null
      , httpOptions)
      .pipe(catchError(this.handleService.handleError));
  }

  refreshToken(
    refreshToken: string,
    config: Oauth2Config
  ): Observable<OAuth2> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          `Basic ` + btoa(`${config.client}:${config.secret}`)
      })
    };

    const params: string = [
      `grant_type=refresh_token`,
      `refresh_token=${refreshToken}`
    ].join('&');
    return this.http.post<OAuth2>(
      `${UrlConstant.API.OAUTH2.GET_REFRESH_TOKEN}?${params}`
      , null
      , httpOptions
    )
      .pipe(
        catchError(this.handleService.handleError)
      );
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http
      .get<UserInfo>(UrlConstant.API.OAUTH2.GET_USER_INFO)
      .pipe(catchError(this.handleService.handleError));
  }

  getUserInfo2(token: string): Observable<OAuth2User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          `Bearer ${token}`
      })
    };
    return this.http
      .get<OAuth2User>(UrlConstant.API.OAUTH2.GET_USER_INFO, httpOptions)
      .pipe(catchError(error => {
        if (error.status === 401) {
          return throwError(
            localStorage.getItem('language') === 'vi' ?
              'Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.'
              : 'Login session has expired! Please log in again.'
          );
        } else if (error.status === 403) {
          return throwError('Login session has expired! Please log in again.');
        }
        return throwError(error);
      }));
  }

  getOAuth2(): OAuth2 {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_USER));
  }

  setOAuth2(model: OAuth2): void {
    localStorage.setItem(
      SystemConstant.CURRENT_USER,
      JSON.stringify(model)
    );
  }

  getToken() {
    const auth = this.getOAuth2();
    if (!auth) {
      return null;
    }
    return auth.access_token;
  }

  getRefreshToken() {
    const auth = this.getOAuth2();
    if (!auth) {
      return null;
    }
    return auth.refresh_token;
  }

  getUserGoogle(): UserGoogle {
    return JSON.parse(
      localStorage.getItem(SystemConstant.CURRENT_USER_GOOGLE)
    );
  }

  setUserGoogle(userGoogle: UserGoogle): void {
    localStorage.setItem(
      SystemConstant.CURRENT_USER_GOOGLE,
      JSON.stringify(userGoogle)
    );
  }

  setUserRole(roleUser: RoleUser): void {
    localStorage.setItem(
      SystemConstant.CURRENT_ROLE_USER,
      JSON.stringify(roleUser)
    );
  }

  doLogout() {
    localStorage.removeItem('jwt_user_google');
    localStorage.removeItem('jwt_role_user');
    localStorage.removeItem('jwt_user');
    localStorage.removeItem('thoiGianQuyTrinhId');
    localStorage.removeItem('author');
    localStorage.removeItem('admin');
  }

  // private saveAccessData(accessData: OAuth2) {
  //   this.setOAuth2(accessData);
  //   this.onCredentialUpdated$.next(accessData);
  // }

  // check roles
  checkRole(roleData: string): boolean {
    const authRole = this.getAuthData();
    // let role = [];
    // role = auth.roles.filter(item => item === roleData);
    if (authRole === roleData) {
      return true;
    } else {
      return false;
    }
  }

  getAuthData() {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_ROLE_USER)).role;
  }
}
