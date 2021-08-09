import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HandlerErrorService } from '../../common/handler-error.service';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Observable } from 'rxjs';
import { LinhVucNghienCuu } from 'src/app/core/models/management/danh-muc/linh-vuc-nghien-cuu.model';
import { catchError } from 'rxjs/operators';
import { PagedResults } from 'src/app/core/models/common/response-page.model';


@Injectable({
  providedIn: 'root'
})

export class LinhVucNghienCuuService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.LINH_VUC_NGHIEN_CUU;
  }
  findAll(): Observable<LinhVucNghienCuu[]> {
    return this.http.get<LinhVucNghienCuu[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }
  findAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<LinhVucNghienCuu>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<LinhVucNghienCuu>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: LinhVucNghienCuu): Observable<LinhVucNghienCuu> {
    return this.http.post<LinhVucNghienCuu>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: LinhVucNghienCuu, id: string): Observable<LinhVucNghienCuu> {
    return this.http.put<LinhVucNghienCuu>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<LinhVucNghienCuu> {
    return this.http.delete<LinhVucNghienCuu>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
