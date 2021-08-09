import { HandlerErrorService } from './../common/handler-error.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlConstant } from '../../constants/url.constant';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileInfo } from '../../models/common/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileServiceUser {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.FILE;
  }

  uploadFile(name: string, subFolder: string, model: unknown): Observable<FileInfo> {
    const params = new HttpParams()
      .set('name', name.toString())
      .set('subFolder', subFolder.toString());
    return this.http.post<FileInfo>(this.apiUrl, model, { params })
      .pipe(catchError(this.handleService.handleError));
  }


}
