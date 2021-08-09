import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { TinTuc } from 'src/app/core/models/management/danh-muc/tin-tuc.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class TinTucService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.HOC_VI;
  }

  getAllTinTuc(): Observable<TinTuc[]> {
    return this.http.get<TinTuc[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingTinTuc(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<TinTuc>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<TinTuc>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createTinTuc(model: TinTuc): Observable<TinTuc> {
    return this.http.post<TinTuc>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateTinTuc(model: TinTuc, id: string): Observable<TinTuc> {
    return this.http.put<TinTuc>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteTinTuc(id: string): Observable<TinTuc> {
    return this.http.delete<TinTuc>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getTinTucById(id: string): Observable<TinTuc> {
    return this.http
      .get<TinTuc>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
