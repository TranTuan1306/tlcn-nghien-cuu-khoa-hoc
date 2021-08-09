import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BienBanKiemTraBM08 } from 'src/app/core/models/bieu-mau/bm08-bien-ban-kiem-tra.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class BienBanKiemTraService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.BIEN_BAN_KIEM_TRA;
  }
  getAllBienBanKiemTra(): Observable<BienBanKiemTraBM08[]> {
    return this.http.get<BienBanKiemTraBM08[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }
  getAllPagingBienBanKiemTra(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BienBanKiemTraBM08>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<BienBanKiemTraBM08>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createBienBanKiemTra(model: BienBanKiemTraBM08): Observable<BienBanKiemTraBM08> {
    return this.http.post<BienBanKiemTraBM08>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateBienBanKiemTra(model: BienBanKiemTraBM08, id: string): Observable<BienBanKiemTraBM08> {
    return this.http.put<BienBanKiemTraBM08>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteBienBanKiemTra(id: string): Observable<BienBanKiemTraBM08> {
    return this.http.delete<BienBanKiemTraBM08>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
