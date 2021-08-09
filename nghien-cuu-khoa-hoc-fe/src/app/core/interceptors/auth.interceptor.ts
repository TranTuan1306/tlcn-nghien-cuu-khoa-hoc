/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from '../constants/url.constant';
import { OAuth2Service } from '../services/auth/oauth2.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authSvc: OAuth2Service,
    private alert: ToastrService,
    private router: Router,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes(UrlConstant.API.OAUTH2.GET_ACCESS_TOKEN)) {
      return next.handle(req);
    }

    if (req.url.includes('https://maps.googleapis.com')) {
      return next.handle(req);
    }

    if (this.authSvc.getOAuth2()) {
      req = this.addToken(req, this.authSvc.getToken());
    }

    return next.handle(req).pipe(
      catchError(
        err =>
          new Observable<HttpEvent<any>>(observer => {
            switch (err.error.error) {
              case 'unauthorized':
                if (this.authSvc.getOAuth2()) {
                  this.alert.warning(
                    'Bạn chưa đăng nhập vào hệ thống !'
                  );
                } else {
                  this.router.navigate([
                    UrlConstant.ROUTE.LOGIN
                  ]);
                }
                break;
              case 'invalid_token':
                this.router.navigate([
                  UrlConstant.ROUTE.LOGIN
                ]);
                break;
              case 'access_denied':
                this.alert.warning(
                  'Tài khoản không có quyền truy cập !'
                );
                this.router.navigate([
                  UrlConstant.ROUTE.LOGIN
                ]);
                break;
            }
            observer.error(err);
            observer.complete();
          })
      )
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
