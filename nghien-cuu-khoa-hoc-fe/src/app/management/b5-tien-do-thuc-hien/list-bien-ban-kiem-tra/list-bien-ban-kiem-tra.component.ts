import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BienBanKiemTraBM08 } from 'src/app/core/models/bieu-mau/bm08-bien-ban-kiem-tra.model';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { BienBanKiemTraService } from 'src/app/core/services/management/de-tai/bien-ban-kiem-tra.service';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { OAuth2Service } from 'src/app/core/services/auth/oauth2.service';

@Component({
  selector: 'app-list-bien-ban-kiem-tra',
  templateUrl: './list-bien-ban-kiem-tra.component.html',
  styleUrls: ['./list-bien-ban-kiem-tra.component.scss']
})
export class ListBienBanKiemTraComponent implements OnInit {

  @Input() modalDataDeTai: ModalData<DeTai>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('importMinhChung') importMinhChungKiemTraThuyetMinhElement: ElementRef;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant;
  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  listFileDinhKem: { id: string; fileInfo: FileInfo }[] = [];

  form: FormGroup;

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<BienBanKiemTraBM08> = new ModalData<BienBanKiemTraBM08>();

  // table
  listBienBanKiemTra: { idFile: string; fileInfo: FileInfo }[] = [] ;
  searchValue = '';
  tableLoading = true;
  fileId = '';

  //authen
  checkRole = false;

  constructor(
    private modalService: NzModalService,
    private bienBanKiemTraSvc: BienBanKiemTraService,
    private alert: ToastrService,
    private fileSvc: FileControllerService,
    private spinner: NgxSpinnerService,
    private authService: OAuth2Service
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].RESEARCH_DOMAIN;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];
    if (this.authService.checkRole(SystemConstant.ROLE_USER.ROLE_ADMIN)) {
      this.checkRole = true;
    } else if (this.authService.checkRole(SystemConstant.ROLE_USER.ROLE_TRUONG_DON_VI)) {
      this.checkRole = false;
    }
    this.modalDataDeTai.data.fileBienBanKiemTraThucHiens.map((x) => {
      this.fileSvc.getFileInfo(x).subscribe( res => {
        this.listBienBanKiemTra.push({ idFile: x, fileInfo: res });
      });
    });
    // this.fileId = this.modalDataDeTai.data.fileBienBanKiemTraThucHiens[0];
  }

  modalView(template: TemplateRef<unknown>, data: string, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.VIEW;
    this.fileId = data;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: this.languageData[this.langCode].VIEW + this.languageData[this.langCode].INSPECTION_RECORDS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      // nzOnOk: () => this.closeModal(),
      // nzOnCancel: () => this.closeModal()
    });
  }

  closeModal(status: boolean): void {
    if (status) {}
    this.modalRef.destroy();
  }

  // Upload file /////////////////////////////////////////
  // eslint-disable-next-line @typescript-eslint/member-ordering
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  extractFileFromListId = this.fileSvc.extractFileFromListId;

  showFileName(idFile: string): string {
    const file = this.listFileDinhKem.find(x => x.id === idFile);
    return file ? file.fileInfo.tenFile : 'File không tồn tại';
  }

  // End Upload file //////////////////////////////////////

  clickUploadFileMinhChungKiemTraThuyetMinh() {
    this.importMinhChungKiemTraThuyetMinhElement.nativeElement.click();
  }

  importMinhChungAdmin(file: File): void{
    this.spinner.show();
    this.fileSvc.uploadFile(file)
      .subscribe((resFile) => {
        this.bienBanKiemTraSvc.importMinhChungBienBanKiemTra(this.modalDataDeTai.data.id, resFile.id)
          .subscribe((res)=>{
            this.fileId = resFile.id;
            this.modalDataDeTai.data.fileBienBanKiemTraThucHiens = res.fileBienBanKiemTraThucHiens;
            this.fileSvc.getFileInfo(resFile.id).subscribe(resFileChild => {
              this.listBienBanKiemTra.push({ idFile: resFile.id, fileInfo: resFileChild });
            });
            this.alert.success(MessageConstant[this.langCode].MSG_UPLOADED_DONE);
            this.spinner.hide();
          }, ()=>this.spinner.hide());
      }, ()=> this.spinner.hide());
  }

  handleTime(isoString: string): string {
    const s = new Date(isoString).toLocaleString('vi');
    return s;
  }
}

