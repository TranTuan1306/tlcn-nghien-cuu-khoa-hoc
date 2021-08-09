import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class BieuMauService {
  private apiUrl: string;
  private apiUrlBienBanHoiDongKiemDuyet: string;
  private apiUrlDongKiemDuyet: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.DE_TAI;
    this.apiUrlBienBanHoiDongKiemDuyet = UrlConstant.API.BIEN_BAN_HOI_DONG_KIEM_DUYET;
    this.apiUrlDongKiemDuyet = UrlConstant.API.HOI_DONG_KIEM_DUYET;
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

  xuatBieuMauBanGiaoThietBi(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/ban-giao-thiet-bi`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  xuatBieuMauBaoCaoTinhHinhthucHienDeTai(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/bao-cao-tinh-hinh-thuc-hien`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  xuatBieuMauBoSungThuyetMinhDetai(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/bo-sung-thuyet-minh`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  xuatBieuMauDeNghiThanhToan(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/de-nghi-thanh-toan`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  xuatBieuMauGiaiTrinhChinhSua(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/giai-trinh-chinh-sua`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  xuatBieuMauHopDongThucHienDeTai(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/hop-dong-thuc-hien-de-tai`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  xuatBieuMauKiemTraTinhHinhThucHienDetai(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/kiem-tra-tinh-hinh-thuc-hien`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  xuatBieuMauThanhLyHopDong(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/thanh-ly-hop-dong`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  xuatBieuMauKiemTraThongTinKetQuaNghienCuu(deTaiId: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/${deTaiId}/thong-tin-ket-qua-nghien-cuu`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  xuatBieuMauDonXinHuyDeTai(deTaiId: string, lyDo: string, soTienDaTamUng: number, thoiGianTamUng: string): Observable<HttpResponse<Blob>> {
    return this.http
      .post(this.apiUrl + `/${deTaiId}/xin-huy-de-tai`, { lyDo, soTienDaTamUng, thoiGianTamUng },
        { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  xuatBienBanHoiDongTuyenChon(idBienBan: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrlBienBanHoiDongKiemDuyet + `/${idBienBan}/bien-ban-hop-hoi-dong-tuyen-chon`,
        { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

  xuatBieuMauDanhGiaThuyetMinh(deTaiId: string, hoiDongXetDuyetId: string): Observable<HttpResponse<Blob>>{
    const params = new HttpParams()
      .set('deTaiId', deTaiId.toString());
    return this.http
      .get(this.apiUrlDongKiemDuyet + `/${hoiDongXetDuyetId}/danh-gia-thuyet-minh-de-tai`,
        { params, observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleService.handleError));
  }

}
