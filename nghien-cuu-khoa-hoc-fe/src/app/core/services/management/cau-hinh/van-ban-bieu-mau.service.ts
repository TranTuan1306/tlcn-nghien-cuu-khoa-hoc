import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { VanBanBieuMau } from 'src/app/core/models/management/cau-hinh/van-ban-bieu-mau.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class VanBanBieuMauService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.VAN_BAN_BIEU_MAU;
  }

  getAllVanBan(): Observable<VanBanBieuMau[]> {
    return this.http.get<VanBanBieuMau[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingVanBan(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<VanBanBieuMau>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<VanBanBieuMau>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingVanBanActive(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<VanBanBieuMau>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<VanBanBieuMau>>(this.apiUrl + '/paging-active', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  createVanBan(model: VanBanBieuMau): Observable<VanBanBieuMau> {
    return this.http.post<VanBanBieuMau>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateVanBan(model: VanBanBieuMau, id: string): Observable<VanBanBieuMau> {
    return this.http.put<VanBanBieuMau>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteVanBan(id: string): Observable<VanBanBieuMau> {
    return this.http.delete<VanBanBieuMau>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
