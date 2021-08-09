import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';
import { ChiTieuDanhGia } from '../../../models/management/danh-muc/bieu-diem-danh-gia.model';
@Injectable({
  providedIn: 'root'
})

export class BieuDiemDanhGiaService {
  private apiUrl: string;
  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.BIEU_DIEM_DANH_GIA;
  }

  findAll(): Observable<ChiTieuDanhGia[]> {
    return this.http
      .get<ChiTieuDanhGia[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  findAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<ChiTieuDanhGia>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (column) {
      params = params.set('column', column);
    }

    if (sort) {
      params = params.set('sort', sort);
    }

    if (search) {
      params = params.set('search', search);
    }

    return this.http
      .get<PagedResults<ChiTieuDanhGia>>(this.apiUrl + `/paging`, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  create(model): Observable<ChiTieuDanhGia> {
    return this.http
      .post<ChiTieuDanhGia>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model, id: string): Observable<ChiTieuDanhGia> {
    return this.http
      .put<ChiTieuDanhGia>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<ChiTieuDanhGia> {
    return this.http
      .delete<ChiTieuDanhGia>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
