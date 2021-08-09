import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class ThoiGianQuyTrinhService {


  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.THOI_GIAN_QUY_TRINH;
  }

  getAllThoiGianQuyTrinh(): Observable<ThoiGianQuyTrinh[]> {
    return this.http.get<ThoiGianQuyTrinh[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getThoiGianQuyTrinhActive(): Observable<ThoiGianQuyTrinh[]> {
    return this.http.get<ThoiGianQuyTrinh[]>(this.apiUrl + '/active')
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingThoiGianQuyTrinh(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<ThoiGianQuyTrinh>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<ThoiGianQuyTrinh>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  createThoiGianQuyTrinh(model: ThoiGianQuyTrinh): Observable<ThoiGianQuyTrinh> {
    return this.http.post<ThoiGianQuyTrinh>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateThoiGianQuyTrinh(model: ThoiGianQuyTrinh, id: string): Observable<ThoiGianQuyTrinh> {
    return this.http.put<ThoiGianQuyTrinh>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteThoiGianQuyTrinh(id: string): Observable<ThoiGianQuyTrinh> {
    return this.http.delete<ThoiGianQuyTrinh>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
