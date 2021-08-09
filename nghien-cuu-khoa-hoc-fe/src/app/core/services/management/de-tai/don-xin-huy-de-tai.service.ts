import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { DonXinHuyDeTaiBM09, TuChoiHuyDeTai } from 'src/app/core/models/bieu-mau/bm09-don-xin-huy-de-tai.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class DonXinHuyDeTaiService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.DON_XIN_HUY_DE_TAI;
  }
  getAllDonXinHuyDeTai(): Observable<DonXinHuyDeTaiBM09[]> {
    return this.http.get<DonXinHuyDeTaiBM09[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }
  getAllPagingDonXinHuyDeTai(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DonXinHuyDeTaiBM09>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<DonXinHuyDeTaiBM09>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createDonXinHuyDeTai(model: DonXinHuyDeTaiBM09): Observable<DonXinHuyDeTaiBM09> {
    return this.http.post<DonXinHuyDeTaiBM09>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateDonXinHuyDeTai(model: DonXinHuyDeTaiBM09, id: string): Observable<DonXinHuyDeTaiBM09> {
    return this.http.put<DonXinHuyDeTaiBM09>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteDonXinHuyDeTai(id: string): Observable<DonXinHuyDeTaiBM09> {
    return this.http.delete<DonXinHuyDeTaiBM09>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

  createTuChoiHuyDeTai(model: TuChoiHuyDeTai): Observable<TuChoiHuyDeTai> {
    return this.http.post<TuChoiHuyDeTai>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  onDongYHuyDeTai(model: TuChoiHuyDeTai): Observable<TuChoiHuyDeTai> {
    return this.http.post<TuChoiHuyDeTai>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }


}
