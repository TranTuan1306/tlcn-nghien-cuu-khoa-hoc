import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { DeNghiThanhToanBM18 } from 'src/app/core/models/bieu-mau/bm18-de-nghi-thanh-toan.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class DeNghiThanhToanService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.DE_NGHI_THANH_TOAN;
  }
  getAllDeNghiThanhToan(): Observable<DeNghiThanhToanBM18[]> {
    return this.http.get<DeNghiThanhToanBM18[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }
  getAllPagingDeNghiThanhToan(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<DeNghiThanhToanBM18>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<DeNghiThanhToanBM18>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createDeNghiThanhToan(model: DeNghiThanhToanBM18): Observable<DeNghiThanhToanBM18> {
    return this.http.post<DeNghiThanhToanBM18>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateDeNghiThanhToan(model: DeNghiThanhToanBM18, id: string): Observable<DeNghiThanhToanBM18> {
    return this.http.put<DeNghiThanhToanBM18>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteDeNghiThanhToan(id: string): Observable<DeNghiThanhToanBM18> {
    return this.http.delete<DeNghiThanhToanBM18>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
