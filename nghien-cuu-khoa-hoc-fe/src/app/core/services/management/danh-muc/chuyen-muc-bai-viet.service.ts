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

  getAllChuyenMuc(): Observable<ChuyenMucBaiViet[]> {
    return this.http.get<ChuyenMucBaiViet[]>(this.apiUrl)
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
      .set('size', size.toString());

    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<ChuyenMucBaiViet>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createChuyenMuc(model: ChuyenMucBaiViet): Observable<ChuyenMucBaiViet> {
    return this.http.post<ChuyenMucBaiViet>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateChuyenMuc(model: ChuyenMucBaiViet, id: string): Observable<ChuyenMucBaiViet> {
    return this.http.put<ChuyenMucBaiViet>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteChuyenMuc(id: string): Observable<ChuyenMucBaiViet> {
    return this.http.delete<ChuyenMucBaiViet>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
