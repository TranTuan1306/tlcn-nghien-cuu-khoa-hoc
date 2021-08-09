import { NgxSpinnerService } from 'ngx-spinner';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from '../../constants/url.constant';
import { FileController, FileInfo, ListFilesPatch } from '../../models/common/file-controller.model';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class FileControllerService {

  private apiUrl: string;

  constructor(private http: HttpClient,
    private handleErrorService: HandlerErrorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.apiUrl = UrlConstant.API.FILE;
  }

  uploadFile(file: File): Observable<FileController> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http
      .post<FileController>(this.apiUrl, fd)
      .pipe(catchError(this.handleErrorService.handleError));
  }

  getFileInfo(idFile: string): Observable<FileInfo> {
    return this.http
      .get<FileInfo>(this.apiUrl + '/' + idFile)
      .pipe(catchError(this.handleErrorService.handleError));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getViewLink(idFile: string) {
    return this.apiUrl + `/view/${idFile}`;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  extractFileFromListId(listFileId: string[]) {
    if (listFileId.length && !listFileId.includes(null)) {
      const returnList = [];
      listFileId.forEach(idFile => {
        returnList.push({
          id: idFile
        });
      });
      return returnList;
    } else {
      return [];
    }
  }

  setListIdFileToForm(listFiles: ListFilesPatch[], formControlName: string, form: FormGroup): void {
    form.get(formControlName).setValue(listFiles.length ? listFiles.map(x => x.id) : null);
  }

  setIdFileToForm(listFiles: ListFilesPatch[], formControlName: string, form: FormGroup): void {
    form.get(formControlName).setValue(listFiles.length ? listFiles[0].id : null);
  }

  /////////////////////////////////////////////////

  downloadFile(idFile: string): void {
    this.getFileInfo(idFile)
      .subscribe(resInfo => {
        this.getResourceDownload(idFile)
          .subscribe(res => {
            if (res.status === 200) {
              this.onDownloadFile(res, resInfo.tenFile);
              this.spinner.hide();
            }
          },
          () => this.alert.error('Có lỗi xảy ra hoặc File không tồn tại...'));
      });
  }

  getExtensionFile(fileName: string): string {
    const convertArrray = fileName.split('.');
    return convertArrray.length === 1 ? '' : convertArrray[convertArrray.length - 1];
  }

  private getResourceDownload(idFile: string): Observable<any> {
    return this.http.get(this.apiUrl + '/download/' + idFile, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleErrorService.parseErrorBlob));
  }

  private onDownloadFile(res: any, fileName: string): void {
    const url = window.URL.createObjectURL(res.body);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
