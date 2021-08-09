import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class BienBanKiemTraService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.BIEN_BAN_KIEM_TRA;
  }

  importMinhChungBienBanKiemTra(deTaiId: string, fileId: string): Observable<DeTai> {
    const params = new HttpParams()
      .set('fileId', fileId.toString());
    return this.http.post<DeTai>(this.apiUrl + `/${deTaiId}/bien-ban-kiem-tra-tien-do`, {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }
}
