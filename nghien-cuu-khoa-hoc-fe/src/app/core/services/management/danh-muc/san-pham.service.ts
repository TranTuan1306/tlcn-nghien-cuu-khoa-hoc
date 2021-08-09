import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { SanPham } from 'src/app/core/models/management/danh-muc/san-pham.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class SanPhamService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.SAN_PHAM;
  }

  getAllSanPham(): Observable<SanPham[]> {
    return this.http.get<SanPham[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingSanPham(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<SanPham>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<SanPham>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  createSanPham(model: SanPham): Observable<SanPham> {
    return this.http.post<SanPham>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateSanPham(model: SanPham, id: string): Observable<SanPham> {
    return this.http.put<SanPham>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteSanPham(id: string): Observable<SanPham> {
    return this.http.delete<SanPham>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllSanPhamByLoaiSanPhamAndTrangThaiTrue(loaiSanPham: string): Observable<SanPham[]> {
    return this.http.get<SanPham[]>(this.apiUrl + `/loai-san-pham/${loaiSanPham}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
