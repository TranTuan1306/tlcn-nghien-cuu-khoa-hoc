/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SystemConstant } from '../../constants/system.constant';
import { UrlConstant } from '../../constants/url.constant';
import { Oauth2Config } from '../../models/oauth2/oauth2-config.model';
import { OAuth2, OAuth2User, UserGoogle, UserInfo } from '../../models/oauth2/oauth2.interface';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable()
export class OAuth2Service {

  public onCredentialUpdated$: Subject<OAuth2>;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
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

    return this.http
      .post<OAuth2>(
      `${UrlConstant.API.OAUTH2.GET_ACCESS_TOKEN}?${params}`,
      null,
      httpOptions
    )
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
    return this.http
      .post<OAuth2>(
      `${UrlConstant.API.OAUTH2.GET_REFRESH_TOKEN}?${params}`,
      null,
      httpOptions
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
      .pipe(catchError(this.handleService.handleError));
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

  doLogout() {
    localStorage.clear();
  }

  // private saveAccessData(accessData: OAuth2) {
  //   this.setOAuth2(accessData);
  //   this.onCredentialUpdated$.next(accessData);
  // }
}
