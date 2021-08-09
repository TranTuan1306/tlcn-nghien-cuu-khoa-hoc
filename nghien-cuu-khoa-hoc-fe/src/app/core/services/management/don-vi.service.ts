import { DonVi } from './../../models/management/danh-muc/don-vi.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from '../../constants/url.constant';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class DonViService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.DON_VI;
  }

  getAllDonVi(): Observable<DonVi[]> {
    return this.http
      .get<DonVi[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }
}
