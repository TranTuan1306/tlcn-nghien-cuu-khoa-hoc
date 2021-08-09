import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { GiaiTrinhChinhSuaBM16 } from 'src/app/core/models/bieu-mau/bm16-giai-trinh-chinh-sua.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class GiaiTrinhChinhSuaService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.GIAI_TRINH_CHINH_SUA;
  }
  getAllGiaiTrinhChinhSua(): Observable<GiaiTrinhChinhSuaBM16[]> {
    return this.http.get<GiaiTrinhChinhSuaBM16[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }
  getAllPagingGiaiTrinhChinhSua(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<GiaiTrinhChinhSuaBM16>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<GiaiTrinhChinhSuaBM16>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createGiaiTrinhChinhSua(model: GiaiTrinhChinhSuaBM16): Observable<GiaiTrinhChinhSuaBM16> {
    return this.http.post<GiaiTrinhChinhSuaBM16>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateGiaiTrinhChinhSua(model: GiaiTrinhChinhSuaBM16, id: string): Observable<GiaiTrinhChinhSuaBM16> {
    return this.http.put<GiaiTrinhChinhSuaBM16>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteGiaiTrinhChinhSua(id: string): Observable<GiaiTrinhChinhSuaBM16> {
    return this.http.delete<GiaiTrinhChinhSuaBM16>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
