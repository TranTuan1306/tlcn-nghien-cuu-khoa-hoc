import { HttpClient, HttpParams } from '@angular/common/http';
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

  createDeTai(model: unknown): Observable<DeTai> {
    return this.http
      .post<DeTai>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateDeTai(id: string, model: unknown): Observable<DeTai> {
    return this.http
      .put<DeTai>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  // getDeTaiByEmail(idEmail: string): Observable<DeTai> {
  //   return this.http
  //   .get<DeTai>(this.apiUrl + `/${idEmail}`)
  //   .pipe(catchError(this.handleService.handleError));
  // }

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
    dotDangKyId: string,
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
    return this.http.get<PagedResults<DeTai>>(this.apiUrl + `/chu-nhiem/${dotDangKyId}`, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  exportBM01(deTaiId: string): Observable<DeTai> {
    const params = new HttpParams()
      .set('deTaiId', deTaiId.toString());
    return this.http
      .get<DeTai>(this.apiUrl + `/bm01`, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  exportBM02(deTaiId: string): Observable<DeTai> {
    const params = new HttpParams()
      .set('deTaiId', deTaiId.toString());
    return this.http
      .get<DeTai>(this.apiUrl + `/bm02`, { params })
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

}
