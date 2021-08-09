import { ChuyenMucBaiVietDTO } from './../../../models/management/danh-muc/chuyen-muc-bai-viet.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { ChuyenMucBaiViet } from 'src/app/core/models/management/danh-muc/chuyen-muc-bai-viet.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class ChuyenMucBaiVietService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.CHUYEN_MUC_BAI_VIET;
  }

  createChuyenMuc(model: ChuyenMucBaiVietDTO): Observable<ChuyenMucBaiViet> {
    return this.http.post<ChuyenMucBaiViet>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  getChuyenMucById(chuyenMucId: string): Observable<ChuyenMucBaiViet> {
    return this.http.get<ChuyenMucBaiViet>(this.apiUrl + `${chuyenMucId}`)
      .pipe(catchError(this.handleService.handleError));
  }

  updateChuyenMuc(model: ChuyenMucBaiVietDTO, chuyenMucId: string): Observable<ChuyenMucBaiViet> {
    return this.http.put<ChuyenMucBaiViet>(this.apiUrl + `/${chuyenMucId}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteChuyenMuc(chuyenMucId: string): Observable<ChuyenMucBaiViet> {
    return this.http.delete<ChuyenMucBaiViet>(this.apiUrl + `/${chuyenMucId}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingChuyenMuc(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<ChuyenMucBaiViet>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<ChuyenMucBaiViet>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingChuyenMucActive(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<ChuyenMucBaiViet>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<ChuyenMucBaiViet>>(this.apiUrl + '/paging-active', { params })
      .pipe(catchError(this.handleService.handleError));
  }
}
