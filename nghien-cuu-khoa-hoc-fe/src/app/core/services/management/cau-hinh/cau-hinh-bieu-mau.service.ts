import { CauHinhBieuMau } from './../../../models/management/cau-hinh/cau-hinh-bieu-mau.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { HandlerErrorService } from '../../common/handler-error.service';
import { PagedResults } from 'src/app/core/models/common/response-page.model';

@Injectable({
  providedIn: 'root'
})
export class CauHinhBieuMauService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.CAU_HINH_BIEU_MAU;
  }

  getCauHinhBieuMau(): Observable<CauHinhBieuMau> {
    return this.http.get<CauHinhBieuMau>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  createCauHinhBieuMau(model: CauHinhBieuMau): Observable<CauHinhBieuMau> {
    return this.http
      .post<CauHinhBieuMau>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateCauHinhBieuMau(id: string, model: CauHinhBieuMau): Observable<CauHinhBieuMau> {
    return this.http
      .put<CauHinhBieuMau>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  getCauHinhBieuMauPaging(
    page: number,
    size: number,
    sort?: string,
    column?: string): Observable<PagedResults<CauHinhBieuMau>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<CauHinhBieuMau>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }


}
