/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageConstant } from '../../constants/message.constant';
import { LanguageConstant } from '../../constants/language.constant';
import { ResponseErrorData } from '../../models/common/response-data.model';

@Injectable()
export class HandlerErrorService {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  routerNext = '';
  constructor(
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
  ) { }
  handleError(error: HttpErrorResponse): Observable<never> {
    console.log('handleError', error);
    if (error.error instanceof ErrorEvent) {
      //
    } else {
      return throwError(error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  parseErrorBlob(err: HttpErrorResponse): Observable<unknown> {
    const reader: FileReader = new FileReader();

    const obs = new Observable((observer: any) => {
      reader.onloadend = () => {
        observer.error(JSON.parse(reader.result as any));
        observer.complete();
      };
    });
    reader.readAsText(err.error);
    return obs;
  }

  convertError(err: ResponseErrorData) {
    this.spinner.hide();
    if (err.status === 401) {
      const lang = localStorage.getItem('language');
      localStorage.clear();
      setTimeout(() => {
        if (lang) {
          localStorage.setItem('language', lang);
        } else {
          localStorage.setItem('language', 'en');
        }
        setTimeout(() => {
          window.location.href = '../';
        }, 100);
      }, 100);
      this.alert.error(MessageConstant[this.langCode].MSG_ERROR_AUTH);
    } else if (err.status === 403) {
      this.alert.error(MessageConstant[this.langCode].MSG_ERR_AUTH);
    } else if (err.status === 500) {
      this.alert.error(MessageConstant[this.langCode].MSG_ERR_SYSTEM);
    } else {
      // err.message undefined thì xem lại api, nếu {responseType: 'text'} thì undefined đúng rùi
      this.alert.error(err.message ? err.message : MessageConstant[this.langCode].MSG_ERR_SYSTEM);
    }
  }
}
