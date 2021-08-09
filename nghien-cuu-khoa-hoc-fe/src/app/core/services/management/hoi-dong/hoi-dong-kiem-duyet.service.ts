import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HoiDongDuyetThuyetMinhGet } from 'src/app/core/models/management/hoi-dong/hoi-dong-duyet-thuyet-minh-get.model';
import { HoiDongDuyetThuyetMinh } from 'src/app/core/models/management/hoi-dong/hoi-dong-duyet-tm.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class HoiDongKiemDuyetService {

  private apiUrlHoiDongKiemDuyet: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrlHoiDongKiemDuyet = UrlConstant.API.HOI_DONG_KIEM_DUYET;
  }

  taoHoiDongXetDuyet(model: HoiDongDuyetThuyetMinh): Observable<HoiDongDuyetThuyetMinh> {
    return this.http.post<HoiDongDuyetThuyetMinh>(this.apiUrlHoiDongKiemDuyet, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateHoiDongXetDuyet(id: string, model: HoiDongDuyetThuyetMinh): Observable<HoiDongDuyetThuyetMinh> {
    return this.http.put<HoiDongDuyetThuyetMinh>(this.apiUrlHoiDongKiemDuyet + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  getHoiDongKiemDuyetPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<HoiDongDuyetThuyetMinhGet>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<HoiDongDuyetThuyetMinhGet>>(this.apiUrlHoiDongKiemDuyet + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }


}
