import { ThongBao } from './../../../models/management/de-tai/thong-bao.model';
import { UrlConstant } from './../../../constants/url.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HandlerErrorService } from '../../common/handler-error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PagedResults } from 'src/app/core/models/common/response-page.model';

@Injectable({
  providedIn: 'root'
})
export class ThongBaoService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.THONG_BAO;
  }

  capNhatThongBao(thongBaoIds: string[]): Observable<ThongBao[]> {
    return this.http
      .post<ThongBao[]>(this.apiUrl + `/change-status`, thongBaoIds)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingThongBao(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<ThongBao>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<ThongBao>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }
}
