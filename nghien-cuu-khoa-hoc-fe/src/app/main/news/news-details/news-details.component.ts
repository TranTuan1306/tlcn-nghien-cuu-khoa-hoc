import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
import { TinTuc } from 'src/app/core/models/management/danh-muc/tin-tuc.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { TrackingTinTucService } from 'src/app/core/services/common/tracking-tin-tuc.service';
import { TinTucService } from 'src/app/core/services/management/danh-muc/tin-tuc.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {


  chitietTinTuc: TinTuc;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  fileViewId = '';
  fileDinhKem: { id: string; fileInfo: FileInfo }[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private fileSvc: FileControllerService,
    private nzModalSvc: NzModalService,
    private tinTucSvc: TinTucService,
    private trackingIdTinTucSvc: TrackingTinTucService,
  ) {
    this.trackingIdTinTucSvc.getId().subscribe(id => {
      // window.alert(id);
      this.spinner.show();
      if (id) {
        this.tinTucSvc.getTinTucById(id)
          .subscribe(res => {
            this.chitietTinTuc = res;
            this.spinner.hide();
          }, () => this.spinner.hide());
      }
    });
  }

  ngOnInit(): void {
    // this.getThongBaoById(this.route.snapshot.params.id);
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

  downloadFile(id: string): void {
    this.fileSvc.downloadFile(id);
  }

  hideModalViewFile(): void {
    this.nzModalSvc.closeAll();
  }

  storeFileInfo(idFile: string, fileInfo: FileInfo): void {
    this.fileDinhKem.push({ id: idFile, fileInfo });
  }

  showFileName(idFile: string): string {
    const file = this.fileDinhKem.find(x => x.id === idFile);
    return file ? file.fileInfo.tenFile : this.languageData[this.langCode].FILE_NOT_FOUND;
  }

}

