import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class BoSungThuyetMinhService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.BO_SUNG_THUYET_MINH;
  }

  importMinhChungBoSungThuyetMinh(deTaiId: string, fileId: string): Observable<DeTai> {
    const params = new HttpParams()
      .set('fileId', fileId.toString());
    return this.http
      .post<DeTai>(this.apiUrl + `/${deTaiId}/chung-minh-bo-sung-thuyet-minh`, {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }


}
