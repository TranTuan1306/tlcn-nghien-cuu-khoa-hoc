import { FileControllerService } from './../../../core/services/common/file-controller.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { BoSungThuyetMinhBM06 } from 'src/app/core/models/bieu-mau/bm06-bo-sung-thuyet-minh';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { BoSungThuyetMinhService } from 'src/app/core/services/management/de-tai/bo-sung-thuyet-minh.service';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
import { OAuth2Service } from 'src/app/core/services/auth/oauth2.service';
import { SystemConstant } from 'src/app/core/constants/system.constant';

@Component({
  selector: 'app-list-bo-sung-thuyet-minh',
  templateUrl: './list-bo-sung-thuyet-minh.component.html',
  styleUrls: ['./list-bo-sung-thuyet-minh.component.scss']
})
export class ListBoSungThuyetMinhComponent implements OnInit {

  @Input() modalDataDeTai: ModalData<DeTai>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('importBoSungThuyetMinhElementRef') importBoSungThuyetMinhElementRef: ElementRef;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant;
  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<BoSungThuyetMinhBM06> = new ModalData<BoSungThuyetMinhBM06>();

  // table
  listBoSungThuyetMinh: { idFile: string; fileInfo: FileInfo }[] = [];
  fileId = '';

  //authen
  checkRole = false;

  constructor(
    private modalService: NzModalService,
    private boSungThuyetMinhSvc: BoSungThuyetMinhService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private fileSvc: FileControllerService,
    private authService: OAuth2Service
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].RESEARCH_DOMAIN;
    // this.fileId = this.modalDataDeTai.data.fileBoSungThuyetMinhs[0];

    if (this.authService.checkRole(SystemConstant.ROLE_USER.ROLE_ADMIN)) {
      this.checkRole = true;
    } else if (this.authService.checkRole(SystemConstant.ROLE_USER.ROLE_TRUONG_DON_VI)) {
      this.checkRole = false;
    }
    this.modalDataDeTai.data.fileBoSungThuyetMinhs.map((x) => {
      this.fileSvc.getFileInfo(x).subscribe(res => {
        this.listBoSungThuyetMinh.push({ idFile: x, fileInfo: res });
      });
    });
  }

  modalView(template: TemplateRef<unknown>, idFile: string, modalWidth?: number) {
    this.fileId = idFile;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: this.languageData[this.langCode].VIEW + this.languageData[this.langCode].FILE_PROOF,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  closeModal(status: boolean): void {
    if (status) {
    }
    this.modalRef.destroy();
  }

  // End Upload file //////////////////////////////////////

  clickUploadFileBoSungThuyetMinh() {
    this.importBoSungThuyetMinhElementRef.nativeElement.click();
  }

  importBoSungThuyetMinh(file: File): void {
    this.spinner.show();
    this.fileSvc.uploadFile(file).subscribe(resFile => {
      this.boSungThuyetMinhSvc.importMinhChungBoSungThuyetMinh(this.modalDataDeTai.data.id, resFile.id)
        .subscribe((res) => {
          // this.modalDataDeTai.data.fileBoSungThuyetMinhs[0] = resFile.id;
          this.fileId = resFile.id;
          this.modalDataDeTai.data.fileBoSungThuyetMinhs = res.fileBoSungThuyetMinhs;
          this.fileSvc.getFileInfo(resFile.id).subscribe(resFileChild => {
            this.listBoSungThuyetMinh.push({ idFile: resFile.id, fileInfo: resFileChild });
          });
          this.spinner.hide();
          this.alert.success(MessageConstant[this.langCode].MSG_UPLOADED_DONE);
        });
    });
  }

  handleTime(isoString: string): string {
    const s = new Date(isoString).toLocaleString('vi');
    return s;
  }

}
