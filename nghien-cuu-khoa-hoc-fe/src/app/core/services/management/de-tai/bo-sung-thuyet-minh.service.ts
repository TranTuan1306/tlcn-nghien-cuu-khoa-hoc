import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BoSungThuyetMinhBM06 } from 'src/app/core/models/bieu-mau/bm06-bo-sung-thuyet-minh';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class BoSungThuyetMinhService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.BO_SUNG_THUYET_MINH;
  }
  getAllBoSungThuyetMinh(): Observable<BoSungThuyetMinhBM06[]> {
    return this.http.get<BoSungThuyetMinhBM06[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }
  getAllPagingBoSungThuyetMinh(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BoSungThuyetMinhBM06>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<BoSungThuyetMinhBM06>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createBoSungThuyetMinh(model: BoSungThuyetMinhBM06): Observable<BoSungThuyetMinhBM06> {
    return this.http.post<BoSungThuyetMinhBM06>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateBoSungThuyetMinh(model: BoSungThuyetMinhBM06, id: string): Observable<BoSungThuyetMinhBM06> {
    return this.http.put<BoSungThuyetMinhBM06>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteBoSungThuyetMinh(id: string): Observable<BoSungThuyetMinhBM06> {
    return this.http.delete<BoSungThuyetMinhBM06>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
