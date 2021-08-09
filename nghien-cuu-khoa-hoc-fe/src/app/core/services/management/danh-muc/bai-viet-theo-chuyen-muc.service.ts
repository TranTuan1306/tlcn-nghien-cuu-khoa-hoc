import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { BaiVietTheoChuyenMuc } from 'src/app/core/models/management/danh-muc/bai-viet-theo-chuyen-muc.model';
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

  getAllBaiViet(): Observable<BaiVietTheoChuyenMuc[]> {
    return this.http.get<BaiVietTheoChuyenMuc[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingBaiViet(
    idChuyenMuc: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BaiVietTheoChuyenMuc>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<BaiVietTheoChuyenMuc>>(this.apiUrl + '/paging/' + idChuyenMuc, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  createBaiViet(model: BaiVietTheoChuyenMuc): Observable<BaiVietTheoChuyenMuc> {
    return this.http.post<BaiVietTheoChuyenMuc>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateBaiViet(model: BaiVietTheoChuyenMuc, id: string): Observable<BaiVietTheoChuyenMuc> {
    return this.http.put<BaiVietTheoChuyenMuc>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteBaiViet(id: string): Observable<BaiVietTheoChuyenMuc> {
    return this.http.delete<BaiVietTheoChuyenMuc>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
