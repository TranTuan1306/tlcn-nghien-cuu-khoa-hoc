import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { NoiDungEmail } from 'src/app/core/models/management/cau-hinh/noi-dung-email.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class NoiDungEmailService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleErrSvc: HandlerErrorService,
  ) {
    this.apiUrl = UrlConstant.API.NOI_DUNG_EMAIL;
  }

  getNoiDungEmailById(id: string): Observable<NoiDungEmail> {
    return this.http.get<NoiDungEmail>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleErrSvc.handleError));
  }

  getAllNoiDungEmail(): Observable<NoiDungEmail[]> {
    return this.http.get<NoiDungEmail[]>(this.apiUrl)
      .pipe(catchError(this.handleErrSvc.handleError));
  }

  getAllPagingNoiDungEmail(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<NoiDungEmail>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) { params.set('search', search); }
    if (sort) { params.set('sort', sort); }
    if (column) { params.set('column', column); }

    return this.http.get<PagedResults<NoiDungEmail>>(this.apiUrl + `/paging`, { params })
      .pipe(catchError(this.handleErrSvc.handleError));
  }

  createNoiDungEmail(model: NoiDungEmail): Observable<NoiDungEmail> {
    return this.http.post<NoiDungEmail>(this.apiUrl, model)
      .pipe(catchError(this.handleErrSvc.handleError));
  }

  updateNoiDungEmail(id: string, model: NoiDungEmail): Observable<NoiDungEmail> {
    return this.http.put<NoiDungEmail>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleErrSvc.handleError));
  }

  deleteNoiDungEmail(id: string): Observable<NoiDungEmail> {
    return this.http.delete<NoiDungEmail>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleErrSvc.handleError));
  }

  postEmailMoiVietBai(noiDungEmailId: string): Observable<NoiDungEmail> {
    const params = new HttpParams()
      .set('noiDungEmailId', noiDungEmailId);
    return this.http
      .post<NoiDungEmail>(this.apiUrl + `/moi-viet-bai`, params)
      .pipe(catchError(this.handleErrSvc.handleError));
  }

}
