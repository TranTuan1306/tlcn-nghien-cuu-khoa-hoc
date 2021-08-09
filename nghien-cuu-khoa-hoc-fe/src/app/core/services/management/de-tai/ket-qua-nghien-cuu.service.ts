import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { KetQuaNghienCuuBM1011 } from 'src/app/core/models/bieu-mau/bm10-11-ket-qua-nghien-cuu.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class KetQuaNghienCuuService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.DON_XIN_HUY_DE_TAI;
  }
  getAllKetQuaNghienCuu(): Observable<KetQuaNghienCuuBM1011[]> {
    return this.http.get<KetQuaNghienCuuBM1011[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }
  getAllPagingKetQuaNghienCuu(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<KetQuaNghienCuuBM1011>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<KetQuaNghienCuuBM1011>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createKetQuaNghienCuu(model: KetQuaNghienCuuBM1011): Observable<KetQuaNghienCuuBM1011> {
    return this.http.post<KetQuaNghienCuuBM1011>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateKetQuaNghienCuu(model: KetQuaNghienCuuBM1011, id: string): Observable<KetQuaNghienCuuBM1011> {
    return this.http.put<KetQuaNghienCuuBM1011>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }
}
