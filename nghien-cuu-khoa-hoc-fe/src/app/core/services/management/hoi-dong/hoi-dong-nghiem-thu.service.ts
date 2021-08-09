import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { CapNhatHoiDongNghiemThuDto, ChuTichThuKyDeTaiDto, HoiDongNghiemThu }
  from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { HandlerErrorService } from '../../common/handler-error.service';
import { ThanhVienHoiDongNghiemThuDtos } from 'src/app/core/models/management/de-tai/thanh-vien-hoi-dong-nghiem-thu.model';

@Injectable({
  providedIn: 'root'
})
export class HoiDongNghiemThuService {

  private apiUrlHoiDongNghiemThu: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrlHoiDongNghiemThu = UrlConstant.API.HOI_DONG_KIEM_NGHIEM_THU;
  }

  //API mới

  getHoiDongNghiemThuById(hoiDongId: string): Observable<HoiDongNghiemThu> {
    return this.http.get<HoiDongNghiemThu>(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}`)
      .pipe(catchError(this.handleService.handleError));
  }

  getHoiDongNghiemThuByDeTai(deTaiId: string): Observable<HoiDongNghiemThu> {
    return this.http.get<HoiDongNghiemThu>(this.apiUrlHoiDongNghiemThu + `/de-tai/${deTaiId}`)
      .pipe(catchError(this.handleService.handleError));
  }

  capNhatHoiDongNghiemThu(data: CapNhatHoiDongNghiemThuDto, hoiDongId: string): Observable<HoiDongNghiemThu> {
    return this.http.put<HoiDongNghiemThu>(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}`, data)
      .pipe(catchError(this.handleService.handleError));
  }

  exportBienBanHopHoiDongNghiemThu(hoiDongId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}/bien-ban-hoi-dong-nghiem-thu`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  uploadBienBanHopHoiDong(diemTrungBinhCuoi: number, fileBienBanHoiDong: string, hoiDongId: string): Observable<HoiDongNghiemThu> {
    return this.http.post<HoiDongNghiemThu>(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}/bien-ban-hop-hoi-dong`,
      { diemTrungBinhCuoi, fileBienBanHoiDong })
      .pipe(catchError(this.handleService.handleError));
  }

  capNhatThanhVien(data: ThanhVienHoiDongNghiemThuDtos[], hoiDongId: string): Observable<HoiDongNghiemThu> {
    return this.http.put<HoiDongNghiemThu>(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}/cap-nhat-thanh-vien`, data)
      .pipe(catchError(this.handleService.handleError));
  }

  exportDanhSachDeXuat(hoiDongId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}/danh-sach-de-xuat`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  duyetThanhVienHoiDongNghiemThuTungNguoi(hoiDongId: string, email: string, trangThaiDuyetThanhVien: boolean):
  Observable<HoiDongNghiemThu> {
    return this.http.post<HoiDongNghiemThu>(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}/duyet-thanh-vien`,
      { email, trangThaiDuyetThanhVien })
      .pipe(catchError(this.handleService.handleError));
  }

  exportPhieuNhanXetPhanBien(hoiDongId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}/nhan-xet-phan-bien`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  exportPhieuDanhGiaNghiemThu(hoiDongId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}/phieu-danh-gia-nghiem-thu`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  uploadPhieuNhanXetVaPhanBienCuaTungThanhVien(
    email: string,
    fileNhanXetPhanBien: string,
    filePhieuDiemHoiDong: string,
    tongDiem: number,
    hoiDongId: string): Observable<HoiDongNghiemThu> {
    return this.http.post<HoiDongNghiemThu>(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}/phieu-diem-nx-pb`,
      { email, fileNhanXetPhanBien, filePhieuDiemHoiDong, tongDiem })
      .pipe(catchError(this.handleService.handleError));
  }

  themNhieuHoiDongVoiListDeTaiIdVaChuTichThuKy(data: ChuTichThuKyDeTaiDto): Observable<HttpResponse<string>> {
    return this.http.post(this.apiUrlHoiDongNghiemThu + `/them-hoi-dong-theo-de-tai`, data,
      { observe: 'response', responseType: 'text' })
      .pipe(catchError(this.handleService.handleError));
  }

  getHoiDongNghiemThuPaging(
    thoiGianQuyTrinhId: string,
    trangThaiDuyetHoiDong: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<HoiDongNghiemThu>> {
    const params = new HttpParams()
      .set('thoiGianQuyTrinhId', thoiGianQuyTrinhId.toString())
      .set('trangThaiDuyetHoiDong', trangThaiDuyetHoiDong)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<HoiDongNghiemThu>>(this.apiUrlHoiDongNghiemThu + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getHoiDongNghiemThuPagingByTDV(
    thoiGianQuyTrinhId: string,
    trangThaiDuyetHoiDong: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<HoiDongNghiemThu>> {
    const params = new HttpParams()
      .set('thoiGianQuyTrinhId', thoiGianQuyTrinhId.toString())
      .set('trangThaiDuyetHoiDong', trangThaiDuyetHoiDong)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<HoiDongNghiemThu>>(this.apiUrlHoiDongNghiemThu + '/hoi-dong-theo-tdv', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getHoiDongNghiemThuPagingByCNDT(
    thoiGianQuyTrinhId: string,
    trangThaiDuyetHoiDong: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<HoiDongNghiemThu>> {
    const params = new HttpParams()
      .set('thoiGianQuyTrinhId', thoiGianQuyTrinhId.toString())
      .set('trangThaiDuyetHoiDong', trangThaiDuyetHoiDong)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<HoiDongNghiemThu>>(this.apiUrlHoiDongNghiemThu + '/hoi-dong-theo-cndt', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  deXuatHoiDongNghiemThu(hoiDongId: string, data: ThanhVienHoiDongNghiemThuDtos[]): Observable<HttpResponse<string>> {
    return this.http.put(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}/de-xuat-thanh-vien`, data,
      { observe: 'response', responseType: 'text' })
      .pipe(catchError(this.handleService.handleError));
  }

  duyetDeXuatHoiDongNghiemThu(hoiDongId: string, data: ThanhVienHoiDongNghiemThuDtos[]): Observable<HttpResponse<string>> {
    return this.http.put(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}/cap-nhat-thanh-vien`, data,
      { observe: 'response', responseType: 'text' })
      .pipe(catchError(this.handleService.handleError));
  }

  uploadFileDeXuatThanhVien(
    fileGioiThieuThanhVien: string,
    hoiDongId: string,
  ): Observable<HoiDongNghiemThu> {
    const params = new HttpParams()
      .set('fileGioiThieuThanhVien', fileGioiThieuThanhVien);
    return this.http.post<HoiDongNghiemThu>(this.apiUrlHoiDongNghiemThu + `/${hoiDongId}/upload-de-xuat-thanh-vien`, { }, { params })
      .pipe(catchError(this.handleService.handleError));
  }


}
