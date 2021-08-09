import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BienBanThanhLyBM19 } from 'src/app/core/models/bieu-mau/bm19-bien-ban-thanh-ly.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class BienBantThanhLyService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.BO_SUNG_THUYET_MINH;
  }
  getAllBienBanThanhLy(): Observable<BienBanThanhLyBM19[]> {
    return this.http.get<BienBanThanhLyBM19[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }
  getAllPagingBienBanThanhLy(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BienBanThanhLyBM19>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<BienBanThanhLyBM19>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createBienBanThanhLy(model: BienBanThanhLyBM19): Observable<BienBanThanhLyBM19> {
    return this.http.post<BienBanThanhLyBM19>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateBienBanThanhLy(model: BienBanThanhLyBM19, id: string): Observable<BienBanThanhLyBM19> {
    return this.http.put<BienBanThanhLyBM19>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteBienBanThanhLy(id: string): Observable<BienBanThanhLyBM19> {
    return this.http.delete<BienBanThanhLyBM19>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
