import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { HomeBannerDTO, HomeBanner } from 'src/app/core/models/management/danh-muc/banner-home.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class BannerHomeService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.BANNER;
  }
  createBanner(model: HomeBannerDTO): Observable<HomeBanner> {
    return this.http.post<HomeBanner>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  getBannertById(bannerId: string): Observable<HomeBanner> {
    return this.http.get<HomeBanner>(this.apiUrl + `/${bannerId}`)
      .pipe(catchError(this.handleService.handleError));
  }

  updateBanner(model: HomeBannerDTO, bannerId: string): Observable<HomeBanner> {
    return this.http.put<HomeBanner>(this.apiUrl + `/${bannerId}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteBanner(bannerId: string): Observable<HomeBanner> {
    return this.http.delete<HomeBanner>(this.apiUrl + `/${bannerId}`)
      .pipe(catchError(this.handleService.handleError));
  }

  changeStatusBanner(bannerId: string): Observable<HomeBanner> {
    return this.http.put<HomeBanner>(this.apiUrl + `/${bannerId}/change-status`, {})
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingBanner(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<HomeBanner>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<HomeBanner>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingBannerActive(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<HomeBanner>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');
    return this.http.get<PagedResults<HomeBanner>>(this.apiUrl + '/paging-active', { params })
      .pipe(catchError(this.handleService.handleError));
  }
}
