import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { LoaiHinhNghienCuu } from 'src/app/core/models/management/danh-muc/loai-hinh-nghien-cuu.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class LoaiHinhNghienCuuService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.LOAI_HINH_NGHIEN_CUU;
  }
  findAll(): Observable<LoaiHinhNghienCuu[]> {
    return this.http.get<LoaiHinhNghienCuu[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }
  findAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<LoaiHinhNghienCuu>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (search) { params.set('search', search.toString()); }
    if (sort) { params.set('sort', sort.toString()); }
    if (column) { params.set('column', column.toString()); }

    return this.http.get<PagedResults<LoaiHinhNghienCuu>>(this.apiUrl + '/paging')
      .pipe(catchError(this.handleService.handleError));
  }

  create(model: LoaiHinhNghienCuu): Observable<LoaiHinhNghienCuu> {
    return this.http.post<LoaiHinhNghienCuu>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  update(model: LoaiHinhNghienCuu, id: string): Observable<LoaiHinhNghienCuu> {
    return this.http.put<LoaiHinhNghienCuu>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  delete(id: string): Observable<LoaiHinhNghienCuu> {
    return this.http.delete<LoaiHinhNghienCuu>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }
}
