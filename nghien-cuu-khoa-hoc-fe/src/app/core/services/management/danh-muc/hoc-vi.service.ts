import { Injectable } from '@angular/core';
import { HocVi } from '../../../models/management/danh-muc/hoc-vi.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HandlerErrorService } from '../../common/handler-error.service';
import { UrlConstant } from '../../../constants/url.constant';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PagedResults } from '../../../models/common/response-page.model';

@Injectable({
  providedIn: 'root'
})
export class HocViService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.HOC_VI;
  }

  findAll(): Observable<HocVi[]> {
    return this.http.get<HocVi[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  findAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<HocVi>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<HocVi>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: HocVi): Observable<HocVi> {
    return this.http.post<HocVi>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: HocVi, id: string): Observable<HocVi> {
    return this.http.put<HocVi>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<HocVi> {
    return this.http.delete<HocVi>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
