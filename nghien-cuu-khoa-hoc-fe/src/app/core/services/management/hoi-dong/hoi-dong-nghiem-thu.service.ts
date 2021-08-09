import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { BienBanHoiDongNghiemThu, HoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class HoiDongNghiemThuService {

  private apiUrlBangDiem: string;
  private apiUrlPhanBien: string;
  private apiUrlBienBanNghiemThu: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrlBangDiem = UrlConstant.API.BANG_DIEM_DANH_GIA;
    this.apiUrlPhanBien = UrlConstant.API.NHAN_XET_PHAN_BIEN;
    this.apiUrlBienBanNghiemThu = UrlConstant.API.BIEN_BAN_NGHIEM_THU;
  }

  // Bảng điểm hội đồng nghiệm thu
  getAllBangDiem(): Observable<HoiDongNghiemThu[]> {
    return this.http.get<HoiDongNghiemThu[]>(this.apiUrlBangDiem)
      .pipe(catchError(this.handleService.handleError));
  }
  getAllPagingBangDiem(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<HoiDongNghiemThu>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<HoiDongNghiemThu>>(this.apiUrlBangDiem + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createBangBiem(model: HoiDongNghiemThu): Observable<HoiDongNghiemThu> {
    return this.http.post<HoiDongNghiemThu>(this.apiUrlBangDiem, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateBangDiem(model: HoiDongNghiemThu, id: string): Observable<HoiDongNghiemThu> {
    return this.http.put<HoiDongNghiemThu>(this.apiUrlBangDiem + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteBangDiem(id: string): Observable<HoiDongNghiemThu> {
    return this.http.delete<HoiDongNghiemThu>(this.apiUrlBangDiem + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  // Nhận xét phản biện của hội đồng nghiệm thu
  getAllPhanBien(): Observable<HoiDongNghiemThu[]> {
    return this.http.get<HoiDongNghiemThu[]>(this.apiUrlPhanBien)
      .pipe(catchError(this.handleService.handleError));
  }
  getAllPagingPhanBien(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<HoiDongNghiemThu>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<HoiDongNghiemThu>>(this.apiUrlPhanBien + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createPhanBien(model: HoiDongNghiemThu): Observable<HoiDongNghiemThu> {
    return this.http.post<HoiDongNghiemThu>(this.apiUrlPhanBien, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updatePhanBien(model: HoiDongNghiemThu, id: string): Observable<HoiDongNghiemThu> {
    return this.http.put<HoiDongNghiemThu>(this.apiUrlPhanBien + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deletePhanBien(id: string): Observable<HoiDongNghiemThu> {
    return this.http.delete<HoiDongNghiemThu>(this.apiUrlPhanBien + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  // Biên bản họp hội đồng nghiệm thu
  getAllBienBan(): Observable<BienBanHoiDongNghiemThu[]> {
    return this.http.get<BienBanHoiDongNghiemThu[]>(this.apiUrlBienBanNghiemThu)
      .pipe(catchError(this.handleService.handleError));
  }
  getAllPagingBienBan(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BienBanHoiDongNghiemThu>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<BienBanHoiDongNghiemThu>>(this.apiUrlBienBanNghiemThu + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createBienBan(model: BienBanHoiDongNghiemThu): Observable<BienBanHoiDongNghiemThu> {
    return this.http.post<BienBanHoiDongNghiemThu>(this.apiUrlBienBanNghiemThu, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateBienBan(model: BienBanHoiDongNghiemThu, id: string): Observable<BienBanHoiDongNghiemThu> {
    return this.http.put<BienBanHoiDongNghiemThu>(this.apiUrlBienBanNghiemThu + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

}
