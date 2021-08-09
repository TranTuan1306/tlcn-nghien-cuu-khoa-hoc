import { FileService } from './../../../core/services/common/file.service';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { FileInfo, ListFilesPatch } from 'src/app/core/models/common/file.model';
import { HandlerErrorService } from 'src/app/core/services/common/handler-error.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() subFolderOnServer: string;
  @Input() isUploadMultiFile: boolean;
  @Input() isDisableUpload: boolean; // but still show view BTN
  @Input() isDisableView: boolean;
  @Input() acceptFilesExtension: string;
  @Input() listFilesPatch: ListFilesPatch[];
  @Output() isUploading: EventEmitter<boolean> = new EventEmitter();
  @Output() returnedListId: EventEmitter<ListFilesPatch[]> = new EventEmitter();

  // Ngon ngu hien thi //////////
  langData = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  //////////////////////////////

  viewModalRef: NzModalRef;

  isStartUpload = false;
  uploadRef: Subscription;
  listFiles: ListFilesPatch[] = [];
  selectedFileIdForView = '';
  defaultFolder = 'chua-phan-loai';

  constructor(
    private fileSvc: FileService,
    private handleErrSvc: HandlerErrorService,
    private nzModalSvc: NzModalService) { }

  ngOnInit(): void {
    const tryTimes = 60;
    let runTimes = 0;
    const trackingFilePatch = setInterval(() => {
      this.listFiles = this.listFilesPatch;
      if (this.listFiles.length > 0 || ++runTimes > tryTimes) {
        clearInterval(trackingFilePatch);
      }
    }, 1000);

    if (!this.acceptFilesExtension) {
      this.acceptFilesExtension = '.jpg,.jpeg,.png,.pdf,.ppt,.pptx,.doc,.docx,.zip,.rar';
    }
  }

  uploadFile(files: File[]) {
    this.isStartUpload = true;
    this.isUploading.emit(true);
    if (this.isUploadMultiFile) {
      this.uploadRef = this.fileSvc.uploadMultiFile(files, this.subFolderOnServer ?? this.defaultFolder)
        .subscribe(res => {
          this.listFiles = [this.listFiles, res.filter(x => x.id).map(x => ({ id: x.id, filename: x.tenFile }))].flat();
          this.returnedListId.emit(this.listFiles);
          this.isStartUpload = false;
          this.isUploading.emit(false);
        }, (err) => {
          this.handleErrSvc.convertError(err);
          this.isStartUpload = false;
          this.isUploading.emit(false);
        });
    } else {
      this.uploadRef = this.fileSvc.uploadFile(files[0], this.subFolderOnServer ?? this.defaultFolder)
        .subscribe(res => {
          this.listFiles = [{ id: res.id, filename: res.tenFile }];
          this.returnedListId.emit(this.listFiles);
          this.isStartUpload = false;
          this.isUploading.emit(false);
        }, (err) => {
          this.handleErrSvc.convertError(err);
          this.isStartUpload = false;
          this.isUploading.emit(false);
        });
    }
  }

  onRemove(index: number): void {
    this.returnedListId.emit(this.listFiles.splice(index, 1));
  }

  setFileName(file: FileInfo, refVar: ListFilesPatch): void {
    refVar.filename = file.tenFile ?? 'File';
  }

  openModalViewFile(template: TemplateRef<unknown>, fileId: string): void {
    this.selectedFileIdForView = fileId;
    this.viewModalRef = this.nzModalSvc.create({
      // nzStyle: { top: '20px', width: '100%', maxWidth: '75vmin' },
      nzWidth: 1000,
      nzTitle: null,
      nzMaskClosable: false,
      nzContent: template,
      nzOnOk: () => this.viewModalRef.close(),
      nzCancelText: null
    });
  }

  hideModalViewFile(): void {
    this.viewModalRef.close();
  }

  onTerminateUploading(): void {
    this.uploadRef.unsubscribe();
    this.isStartUpload = false;
    this.isUploading.emit(false);
  }


}
