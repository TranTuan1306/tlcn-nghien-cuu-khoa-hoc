import { DeTaiDto } from './../../models/management/de-tai/de-tai-dto.model';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from '../../constants/url.constant';
import { PagedResults } from '../../models/common/response-page.model';
import { DeTai } from '../../models/management/de-tai/de-tai.model';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class DeTaiService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.DE_TAI;
  }

  createDeTai(model: DeTaiDto): Observable<DeTai> {
    return this.http
      .post<DeTai>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateDeTai(id: string, model: DeTaiDto): Observable<DeTai> {
    return this.http
      .put<DeTai>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateDetaiDeXuat(id: string, model: DeTaiDto): Observable<DeTai> {
    return this.http
      .put<DeTai>(this.apiUrl + `/${id}/de-xuat`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllDeTaiPaging(
    trangThaiDeTai: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('trangThaiDeTai', trangThaiDeTai)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<DeTai>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getDeTaiByChuNhiem(
    thoiGianQuyTrinhId: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('thoiGianQuyTrinhId', thoiGianQuyTrinhId.toString())
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<DeTai>>(this.apiUrl + `/chu-nhiem`, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getDeTaiByChuNhiemVaStatus(
    thoiGianQuyTrinhId: string,
    trangThaiDeTais: string[],
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.post<PagedResults<DeTai>>(this.apiUrl + `/chu-nhiem`, { thoiGianQuyTrinhId, trangThaiDeTais }, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  // downloadReport(id: string): Observable<HttpResponse<Blob>> {
  //   return this.http.get(this.apiUrl + `/download-bao-cao/${id}`, { observe: 'response', responseType: 'blob' })
  //     .pipe(catchError(this.handleService.handleError));
  // }

  exportBM01(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/de-xuat-de-tai`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  exportBM02(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/thuyet-minh-de-tai`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }



  /////// For admin
  //Get detai chua co hoi dong
  getAllDeTaiChuaCoHoiDongPaging(
    dotDangKyId: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string,): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('dotDangKyId', dotDangKyId)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<DeTai>>(this.apiUrl + `/chua-co-hoi-dong`, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  //Get all detai da duoc duyet
  getAllDeTaiDaDuyetPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<DeTai>>(this.apiUrl + '/da-duoc-duyet-paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getDeTaiById(id: string): Observable<DeTai> {
    return this.http.get<DeTai>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  huyDeTaiById(id: string): Observable<DeTai> {
    return this.http.put<DeTai>(this.apiUrl + `/${id}/huy`, {})
      .pipe(catchError(this.handleService.handleError));
  }

  getDeTaiByTimeLineAndStatus(thoiGianQuyTrinhId: string, trangThaiDeTai: string[]): Observable<DeTai> {
    return this.http.post<DeTai>(this.apiUrl + `/thoi-gian-quy-trinh-va-trang-thai`, { thoiGianQuyTrinhId, trangThaiDeTai })
      .pipe(catchError(this.handleService.handleError));
  }
}
