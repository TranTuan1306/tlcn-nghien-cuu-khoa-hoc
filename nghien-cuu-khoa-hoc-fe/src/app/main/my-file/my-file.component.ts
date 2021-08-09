import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
// import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { DeTaiService } from 'src/app/core/services/user/de-tai.service';

@Component({
  selector: 'app-my-file',
  templateUrl: './my-file.component.html',
  styleUrls: ['./my-file.component.scss',  '../../../assets/journey-theme/css/main.css']
})
export class MyFileComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  listFileDinhKem: { id: string; fileInfo: FileInfo }[] = [];
  fileViewId = '';

  constructor(
    // private fileSvc: FileControllerService,
    private nzModalSvc: NzModalService,
    private detaiSvc: DeTaiService,
  ) { }

  ngOnInit(): void {
  }

  downloadFileBM01(id: string): void {
    this.detaiSvc.exportBM01(id);
  }

  downloadFileBM02(id: string): void {
    this.detaiSvc.exportBM01(id);
  }

  storeFileInfo(idFile: string, fileInfo: FileInfo): void {
    this.listFileDinhKem.push({ id: idFile, fileInfo });
  }

  showFileName(idFile: string): string {
    const file = this.listFileDinhKem.find(x => x.id === idFile);
    return file ? file.fileInfo.tenFile : this.languageData[this.langCode].FILE_NOT_FOUND;
  }

  openModalViewFile(idFile: string, template: TemplateRef<void>, width?: number): void {
    this.fileViewId = idFile;
    this.nzModalSvc.create({
      nzTitle: null,
      nzStyle: { top: '20px', width: width ? `${width}px` : '750px' },
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  hideModalViewFile(): void {
    this.nzModalSvc.closeAll();
  }

}
