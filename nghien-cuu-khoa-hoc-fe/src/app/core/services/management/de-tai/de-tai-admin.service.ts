import { ThoiGianQuyTrinh } from './../../../models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { BaoCaoTienDo } from 'src/app/core/models/management/de-tai/bao-cao-tien-do.model';
import { DeTaiDto } from 'src/app/core/models/management/de-tai/de-tai-dto.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class DeTaiAdminService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.DE_TAI;
  }

  createDeTai(model: DeTaiDto): Observable<DeTai> {
    return this.http
      .post<DeTai>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateDeTai(id: string, model: DeTaiDto): Observable<DeTai> {
    return this.http
      .put<DeTai>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  addMaSoDeTai(deTaiId: string, maSo: string): Observable<DeTai> {
    const params = new HttpParams()
      .set('maSo', maSo);
    return this.http
      .post<DeTai>(this.apiUrl + `/${deTaiId}/them-ma-so`, {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  updateDetaiDeXuat(id: string, model: DeTaiDto): Observable<DeTai> {
    return this.http
      .put<DeTai>(this.apiUrl + `/${id}/de-xuat`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllDeTaiPaging(
    trangThaiDeTai: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
  ): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('trangThaiDeTai', trangThaiDeTai)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<DeTai>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getDeTaiByChuNhiem(
    thoiGianQuyTrinhId: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('thoiGianQuyTrinhId', thoiGianQuyTrinhId.toString())
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<DeTai>>(this.apiUrl + `/chu-nhiem`, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getDeTaiByChuNhiemVaStatus(
    thoiGianQuyTrinhId: string,
    trangThaiDeTais: string[],
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.post<PagedResults<DeTai>>(this.apiUrl + `/chu-nhiem`, { thoiGianQuyTrinhId, trangThaiDeTais }, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getDetaiByDonViVaTrangThaiPaging(
    trangThaiDeTai: string,
    page: number,
    size: number,
    search?: string,
    name?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('trangThaiDeTai', trangThaiDeTai.toString())
      .set('page', page.toString())
      .set('size', size.toString())
      .set('size', name ?? '')
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<DeTai>>(this.apiUrl + `/don-vi-va-trang-thai-paging`, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  exportBM01(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/de-xuat-de-tai`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  exportBM02(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/thuyet-minh-de-tai`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }



  /////// For admin
  //Get detai chua co hoi dong
  getAllDeTaiChuaCoHoiDongPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string,): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<DeTai>>(this.apiUrl + `/chua-co-hoi-dong`, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  //Get all detai da duoc duyet
  getAllDeTaiDaDuyetPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<DeTai>>(this.apiUrl + '/da-duoc-duyet-paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getDeTaiById(id: string): Observable<DeTai> {
    return this.http.get<DeTai>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  huyDeTaiById(id: string): Observable<DeTai> {
    return this.http.put<DeTai>(this.apiUrl + `/${id}/huy`, {})
      .pipe(catchError(this.handleService.handleError));
  }

  getDetaiByTimeLineAndStatus(
    thoiGianQuyTrinhId: string,
    trangThaiDeTais: string[],
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.post<PagedResults<DeTai>>(this.apiUrl + `/thoi-gian-quy-trinh-va-trang-thai`,
      { thoiGianQuyTrinhId, trangThaiDeTais }, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  sendMailToEditKhoa(deTaiId: string, kinhPhiPhanBo: number, noiDungChinhSua: string): Observable<DeTai> {
    return this.http
      .post<DeTai>(this.apiUrl + `/${deTaiId}/mail-yeu-cau-chinh-sua-khoa`, { kinhPhiPhanBo, noiDungChinhSua })
      .pipe(catchError(this.handleService.handleError));
  }

  sendMailToEditKHCN(deTaiId: string, kinhPhiPhanBo: number, noiDungChinhSua: string): Observable<DeTai> {
    return this.http
      .post<DeTai>(this.apiUrl + `/${deTaiId}/mail-yeu-cau-chinh-sua-khcn`, { kinhPhiPhanBo, noiDungChinhSua })
      .pipe(catchError(this.handleService.handleError));
  }

  approvalFaculty(id: string): Observable<DeTai> {
    return this.http
      .put<DeTai>(this.apiUrl + `/${id}/tdv-duyet`, {})
      .pipe(catchError(this.handleService.handleError));
  }

  approvalKHCN(id: string): Observable<DeTai> {
    return this.http
      .put<DeTai>(this.apiUrl + `/${id}/khcn-duyet`, {})
      .pipe(catchError(this.handleService.handleError));
  }

  createBaoCaoTienDo(deTaiId: string, data: BaoCaoTienDo): Observable<DeTai> {
    return this.http
      .post<DeTai>(this.apiUrl + `/${deTaiId}/bao-cao-tien-do`, data)
      .pipe(catchError(this.handleService.handleError));
  }

  updateBaoCaoTienDo(deTaiId: string, data: BaoCaoTienDo): Observable<DeTai> {
    return this.http
      .put<DeTai>(this.apiUrl + `/${deTaiId}/bao-cao-tien-do`, data)
      .pipe(catchError(this.handleService.handleError));
  }

  getDeTaiByListIdPaging(
    deTaiIds: string[],
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DeTai>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.post<PagedResults<DeTai>>(this.apiUrl + '/list-id', { deTaiIds }, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  uploadMinhChungHopDong(deTaiId: string, fileId: string): Observable<DeTai> {
    const params = new HttpParams()
      .set('fileId', fileId.toString());
    return this.http.post<DeTai>(this.apiUrl + `/${deTaiId}/chung-minh-hop-dong`, {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  uploadMinhChungHuyDeTai(deTaiId: string, fileId: string) {
    const duyet = true;
    return this.http.post<DeTai>(this.apiUrl + `/${deTaiId}/chung-minh-xin-huy`, { duyet, fileId })
      .pipe(catchError(this.handleService.handleError));
  }

  khongDuyetHuy(deTaiId: string, noiDungEmailKhongDuyet) {
    const duyet = false;
    return this.http.post<DeTai>(this.apiUrl + `/${deTaiId}/chung-minh-xin-huy`, { duyet, noiDungEmailKhongDuyet })
      .pipe(catchError(this.handleService.handleError));
  }

  // Quyết toán
  uploadFileMinhChungDeNghiThanhToan(deTaiId: string, fileId: string) {
    const params = new HttpParams()
      .set('fileId', fileId.toString());
    return this.http.post<DeTai>(this.apiUrl + `/${deTaiId}/chung-minh-de-nghi-thanh-toan`, {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  uploadFileMinhChungBienBanBanGiaoThietBi(deTaiId: string, fileId: string) {
    const params = new HttpParams()
      .set('fileId', fileId.toString());
    return this.http.post<DeTai>(this.apiUrl + `/${deTaiId}/chung-minh-ban-giao-thiet-bi`, {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  uploadFileMinhChungThanhLyHopDong(deTaiId: string, fileId: string) {
    const params = new HttpParams()
      .set('fileId', fileId.toString());
    return this.http.post<DeTai>(this.apiUrl + `/${deTaiId}/chung-minh-thanh-ly-hop-dong`, {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  thayDoiThoiGianQuyTrinhChoDetai(deTaiId: string, dto: ThoiGianQuyTrinh): Observable<ThoiGianQuyTrinh> {
    return this.http
      .put<ThoiGianQuyTrinh>(this.apiUrl + `/${deTaiId}/thoi-gian-quy-trinh`, dto)
      .pipe(catchError(this.handleService.handleError));
  }

  uploadGiaiTrinhChinhSua(
    deTaiId: string,
    fileId: string,
  ): Observable<DeTai> {
    const params = new HttpParams()
      .set('fileId', fileId.toString());
    return this.http.post<DeTai>(this.apiUrl + `/${deTaiId}/chung-minh-giai-trinh-chinh-sua`, {}, { params })
      .pipe(catchError(this.handleService.handleError));
  }



}
