import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { BaiVietTheoChuyenMuc, BaiVietTheoChuyenMucDTO } from 'src/app/core/models/management/danh-muc/bai-viet-theo-chuyen-muc.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class BaiVietTheoChuyenMucService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.BAI_VIET_THEO_CHUYEN_MUC;
  }

  createBaiViet(model: BaiVietTheoChuyenMucDTO): Observable<BaiVietTheoChuyenMuc> {
    return this.http.post<BaiVietTheoChuyenMuc>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  getBaiVietById(baiVietId: string): Observable<BaiVietTheoChuyenMuc> {
    return this.http.get<BaiVietTheoChuyenMuc>(this.apiUrl + `/${baiVietId}`)
      .pipe(catchError(this.handleService.handleError));
  }

  updateBaiViet(model: BaiVietTheoChuyenMucDTO, baiVietId: string): Observable<BaiVietTheoChuyenMuc> {
    return this.http.put<BaiVietTheoChuyenMuc>(this.apiUrl + `/${baiVietId}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  // deleteBaiViet(baiVietId: string): Observable<BaiVietTheoChuyenMuc> {
  //   return this.http.delete<BaiVietTheoChuyenMuc>(this.apiUrl + `/${baiVietId}`)
  //     .pipe(catchError(this.handleService.handleError));
  // }

  deleteBaiViet(baiVietId: string): Observable<HttpResponse<string>> {
    return this.http.delete(this.apiUrl + `/${baiVietId}`, { observe: 'response', responseType: 'text' })
      .pipe(catchError(this.handleService.handleError));
  }

  doiTrangThaiBaiViet(baiVietId: string): Observable<BaiVietTheoChuyenMuc> {
    return this.http.put<BaiVietTheoChuyenMuc>(this.apiUrl + `/${baiVietId}/change-status`, {})
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingBaiViet(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BaiVietTheoChuyenMuc>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<BaiVietTheoChuyenMuc>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingBaiVietActive(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BaiVietTheoChuyenMuc>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<BaiVietTheoChuyenMuc>>(this.apiUrl + '/paging-active', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingBaiVietTheoChuyenMuc(
    chuyenMucBaiVietId: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BaiVietTheoChuyenMuc>> {
    const params = new HttpParams()
      .set('chuyenMucBaiVietId', chuyenMucBaiVietId.toString())
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<BaiVietTheoChuyenMuc>>(this.apiUrl + '/paging/chuyen-muc', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingBaiVietActiveTheoChuyenMuc(
    chuyenMucBaiVietId: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BaiVietTheoChuyenMuc>> {
    const params = new HttpParams()
      .set('chuyenMucBaiVietId', chuyenMucBaiVietId.toString())
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<BaiVietTheoChuyenMuc>>(this.apiUrl + '/pageing-active/chuyen-muc', { params })
      .pipe(catchError(this.handleService.handleError));
  }
}
