import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { CauHinhEmail } from 'src/app/core/models/management/cau-hinh/cau-hinh-email.model';
import { HandlerErrorService } from '../../common/handler-error.service';
@Injectable({
  providedIn: 'root'
})
export class CauHinhEmailService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.CAU_HINH_EMAIL;
  }

  getCauHinhEmail(): Observable<CauHinhEmail> {
    return this.http.get<CauHinhEmail>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  createCauHinhEmail(model: CauHinhEmail): Observable<CauHinhEmail> {
    return this.http
      .post<CauHinhEmail>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateCauHinhEmail(id: string, model: CauHinhEmail): Observable<CauHinhEmail> {
    return this.http
      .put<CauHinhEmail>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  getCauHinhEmailPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<CauHinhEmail>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<CauHinhEmail>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }


}
