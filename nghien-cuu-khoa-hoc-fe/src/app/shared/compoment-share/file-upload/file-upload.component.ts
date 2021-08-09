import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { FileInfo, ListFilesPatch } from 'src/app/core/models/common/file-controller.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { HandlerErrorService } from 'src/app/core/services/common/handler-error.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() isDisable: boolean;
  @Input() acceptFilesExtension: string;
  @Input() listFilesPatch: ListFilesPatch[];
  @Output() returnedListId: EventEmitter<ListFilesPatch[]> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  isStartUpload = false;
  listFiles: ListFilesPatch[] = [];

  constructor(
    private fileSvc: FileControllerService,
    private handleErrSvc: HandlerErrorService,
  ) { }

  ngOnInit(): void {
    if (this.listFilesPatch) {
      this.listFiles = this.listFilesPatch;
    }
    if (!this.acceptFilesExtension) {
      this.acceptFilesExtension = '.pdf,.jpg,.jpeg,.png,.bmp,.doc,.docx,.xls,.xlsx,.ppt,.pptx';
    }
  }

  uploadFile(files: File[]): void {
    this.isStartUpload = true;
    this.fileSvc.uploadFile(files[0])
      .subscribe(res => {
        this.returnedListId.emit([{ id: res.id, filename: res.tenFile }]);
        this.listFiles = [{ id: res.id, filename: res.tenFile }];
        this.isStartUpload = false;
      },
      (err) => {
        this.handleErrSvc.convertError(err);
        this.isStartUpload = false;
      });
  }

  onRemove(index: number): void {
    this.listFiles.splice(index, 1);
    // const emitList = this.listFiles.map(x => x.id);
    this.returnedListId.emit(this.listFiles);
  }

  setFileName(file: FileInfo, refVar: ListFilesPatch): void {
    refVar.filename = file ? file.tenFile : '';
  }

}
