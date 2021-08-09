import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HandlerErrorService } from '../../common/handler-error.service';
import { UrlConstant } from '../../../constants/url.constant';
import { Observable } from 'rxjs';
import { HocHam } from '../../../models/management/danh-muc/hoc-ham.model';
import { PagedResults } from '../../../models/common/response-page.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HocHamService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.HOC_HAM;
  }

  findAll(): Observable<HocHam[]> {
    return this.http.get<HocHam[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  findAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<HocHam>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<HocHam>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: HocHam): Observable<HocHam> {
    return this.http.post<HocHam>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: HocHam, id: string): Observable<HocHam> {
    return this.http.put<HocHam>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<HocHam> {
    return this.http.delete<HocHam>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
