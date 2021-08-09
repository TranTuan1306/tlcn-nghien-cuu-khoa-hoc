import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BaoCaoTienDoBM07 } from 'src/app/core/models/bieu-mau/bm07-bao-cao-tien-do.model';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class TienDoThucHienDeTaiService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.BAO_CAO_TIEN_DO;
  }
  getAllBaoCao(): Observable<BaoCaoTienDoBM07[]> {
    return this.http.get<BaoCaoTienDoBM07[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }
  getAllPagingBaoCao(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<BaoCaoTienDoBM07>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<BaoCaoTienDoBM07>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  createBaoCao(model: BaoCaoTienDoBM07): Observable<BaoCaoTienDoBM07> {
    return this.http.post<BaoCaoTienDoBM07>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateBaoCao(model: BaoCaoTienDoBM07, id: string): Observable<BaoCaoTienDoBM07> {
    return this.http.put<BaoCaoTienDoBM07>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteBaoCao(id: string): Observable<BaoCaoTienDoBM07> {
    return this.http.delete<BaoCaoTienDoBM07>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
