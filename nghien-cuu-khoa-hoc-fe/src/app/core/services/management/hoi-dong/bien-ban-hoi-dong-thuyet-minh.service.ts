import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { BienBanHoiDongThuyetMinhGet } from 'src/app/core/models/management/hoi-dong/bien-ban-hoi-dong-tm-get.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class BienBanHoiDongThuyetMinhService {

  private apiUrlBienBanHoiDongKiemDuyet: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrlBienBanHoiDongKiemDuyet = UrlConstant.API.BIEN_BAN_HOI_DONG_KIEM_DUYET;
  }

  getBienBanHoiDongKiemDuyetByIdHoiDongPaging(
    hoiDongId: string,
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BienBanHoiDongThuyetMinhGet>> {
    const params = new HttpParams()
      .set('hoiDongId', hoiDongId.toString())
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<BienBanHoiDongThuyetMinhGet>>(this.apiUrlBienBanHoiDongKiemDuyet
      + `/bien-ban-theo-hoi-dong`, { params })
      .pipe(catchError(this.handleService.handleError));
  }

  createBienBanHoiDongKiemDuyet(hoiDongId: string, deTaiId: string): Observable<BienBanHoiDongThuyetMinhGet> {
    return this.http.post<BienBanHoiDongThuyetMinhGet>(this.apiUrlBienBanHoiDongKiemDuyet
      + `/hoi-dong/${hoiDongId}/de-tai/${deTaiId}`, {})
      .pipe(catchError(this.handleService.handleError));
  }

  addPhieuDiemHoiDongThuyetMinh(hoiDongId: string, model: unknown): Observable<BienBanHoiDongThuyetMinhGet> {
    return this.http.post<BienBanHoiDongThuyetMinhGet>(this.apiUrlBienBanHoiDongKiemDuyet
      + `/${hoiDongId}/phieu-diem-hoi-dong-xet-duyet`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  uploadBienBanHoiDongXetDuyet(hoiDongId: string, model: unknown): Observable<BienBanHoiDongThuyetMinhGet> {
    return this.http.put<BienBanHoiDongThuyetMinhGet>(this.apiUrlBienBanHoiDongKiemDuyet
      + `/${hoiDongId}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  getBienBanHoiDongXetDuyetByIdDeTai(deTaiId: string): Observable<BienBanHoiDongThuyetMinhGet> {
    return this.http.get<BienBanHoiDongThuyetMinhGet>(this.apiUrlBienBanHoiDongKiemDuyet
      + `/de-tai/${deTaiId}`)
      .pipe(catchError(this.handleService.handleError));
  }
}

