import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { LoaiKinhPhi } from 'src/app/core/models/management/danh-muc/kinh-phi.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class LoaiKinhPhiService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.LOAI_KINH_PHI;
  }

  findAll(): Observable<LoaiKinhPhi[]> {
    return this.http.get<LoaiKinhPhi[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  findAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<LoaiKinhPhi>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<LoaiKinhPhi>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: LoaiKinhPhi): Observable<LoaiKinhPhi> {
    return this.http.post<LoaiKinhPhi>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: LoaiKinhPhi, id: string): Observable<LoaiKinhPhi> {
    return this.http.put<LoaiKinhPhi>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<LoaiKinhPhi> {
    return this.http.delete<LoaiKinhPhi>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
