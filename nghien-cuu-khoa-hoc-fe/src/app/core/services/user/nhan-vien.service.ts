import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from '../../constants/url.constant';
import { HandlerErrorService } from '../common/handler-error.service';
import { NhanVienEd } from '../../models/management/de-tai/nhan-vien-ed.model';

@Injectable({
  providedIn: 'root'
})
export class NhanVienService {

  private apiUrl: string;
  private apiUrlHRM: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.NHAN_VIEN;
    this.apiUrlHRM = UrlConstant.API.HRM.NHAN_VIEN;
  }

  getCurrent(): Observable<NhanVienEd> {
    // const params = new HttpParams()
    //   .set('name', name);
    return this.http
      .get<NhanVienEd>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getByEmail(email: string): Observable<NhanVienEd> {
    return this.http
      .get<NhanVienEd>(this.apiUrl + `/email/${email}`)
      .pipe(catchError(this.handleService.handleError));
  }

  searchNhanVien(search: string): Observable<NhanVienEd[]> {
    const params = new HttpParams()
      .set('search', search.toString());
    return this.http
      .get<NhanVienEd[]>(this.apiUrlHRM + '/search', { params })
      .pipe(catchError(this.handleService.handleError));
  }
}
