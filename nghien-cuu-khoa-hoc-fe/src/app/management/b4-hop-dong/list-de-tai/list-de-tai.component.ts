import { BieuMauService } from './../../../core/services/management/bieu-mau/bieu-mau.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { ThoiGianQuyTrinhService } from 'src/app/core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';

@Component({
  selector: 'app-list-de-tai',
  templateUrl: './list-de-tai.component.html',
  styleUrls: ['./list-de-tai.component.scss']
})
export class ListDeTaiComponent implements OnInit {

  @ViewChild('uploadMCHopDongTpl') uploadHopHong: ElementRef<HTMLElement>;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant;
  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  //Trạn thái SystemConstant
  listTrangThaiDetai = SystemConstant.TRANG_THAI_DE_TAI_TITLE;

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<string> = new ModalData<string>();

  // table
  loadingTable = true;

  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();
  searchValue = '';
  isUploading = false;
  selectedDeTaiId = '';
  thoiGianQuyTrinhActive: ThoiGianQuyTrinh;
  selectedFileIdForView = '';

  searchValueTextChanged = new Subject<string>();

  constructor(
    private modalService: NzModalService,
    private fileSvc: FileControllerService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private deTaiSvc: DeTaiAdminService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
    private bieuMauSvc: BieuMauService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].CONTRACT;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].TOPICS,
        link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN
      }
    ];
    this.getThoigianQuyTrinhActive();
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getDeTaiBytrangThai(searchValue);
      });
    // this.getAllDataPaging();
  }

  onSearch() {
    this.listDeTai.currentPage = 1;
    // this.getAllDataPaging();
  }

  getThoigianQuyTrinhActive() {
    this.thoiGianQuyTrinhSvc.getThoiGianQuyTrinhActive()
      .subscribe(res => {
        this.thoiGianQuyTrinhActive = res[0];
        this.getDeTaiBytrangThai();
      });
  }

  getDeTaiBytrangThai(searchValue?: string) {
    this.deTaiSvc.getDetaiByTimeLineAndStatus(
      this.thoiGianQuyTrinhActive.id,
      [SystemConstant.TRANG_THAI_DE_TAI.DAT_XET_DUYET, SystemConstant.TRANG_THAI_DE_TAI.KY_HOP_DONG],
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit,
      searchValue)
      .subscribe(res => {
        this.listDeTai.data = res.content;
        this.listDeTai.totalItem = res.totalElements;
        this.listDeTai.totalPage = res.totalPages;
        this.listDeTai.limit = res.pageable.pageSize;
        this.loadingTable = false;
      });
  }

  modalViewTopic(deTaiId: string, template: TemplateRef<unknown>, modalWidth?: number) {
    this.spinner.show();
    setTimeout(() => {
      this.modalData.data = deTaiId;
      this.modalData.action = SystemConstant.ACTION.VIEW;
      this.modalRef = this.modalService.create({
        nzWidth: modalWidth,
        nzTitle: this.languageData[this.langCode].VIEW + ' ' + this.languageData[this.langCode].TOPIC_DETAIL,
        nzContent: template,
        nzFooter: null,
        nzMaskClosable: false,
        nzClosable: true,
      });
    }, 200);
  }

  modalViewTopicContract(template: TemplateRef<unknown>, fileId: string) {
    this.selectedFileIdForView = fileId;
    this.modalRef = this.modalService.create({
      nzStyle: { top: '20px', width: '100%', maxWidth: '75vmin' },
      nzTitle: null,
      nzMaskClosable: false,
      nzContent: template,
      nzOnOk: () => this.modalRef.close(),
      nzCancelText: null
    });

  }

  modalView(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.VIEW;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: DeTai, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    // this.modalData.data = data;
    if (data) { }
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalDelete(id: string) {
    this.modalService.confirm({
      nzWidth: 300,
      nzTitle: MessageConstant[this.langCode].XAC_NHAN_XOA,
      nzContent: MessageConstant[this.langCode].MSG_CONFIRM_DEL,
      nzOkText: MessageConstant[this.langCode].BTN_OK,
      nzCancelText: MessageConstant[this.langCode].BTN_CANCEL,
      nzOnOk: () => {
        console.log(id);
      }
    });
  }

  pageChanged(page: Paginate<DeTai>) {
    this.listDeTai = page;
    // this.getAllDataPaging();
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: (this.modalData.action === SystemConstant.ACTION.ADD ? this.languageData[this.langCode].CREATING
        : this.languageData[this.langCode].EDITING) + this.breadcrumbObj.heading,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      // nzOnOk: () => this.closeModal(),
      // nzOnCancel: () => this.closeModal()
    });
  }

  closeModal(status: boolean): void {
    if (status) {
      // this.getAllDataPaging();
      //
    }
    this.modalRef.destroy();
  }

  modalViewTopicExportContract(idDetai: string, maSo: string) {
    if (this.listDeTai.data[this.listDeTai.data.findIndex(x => x.id === idDetai)].maSo) {
      this.spinner.show();
      this.bieuMauSvc.xuatBieuMauHopDongThucHienDeTai(idDetai)
        .subscribe(res => {
          this.convertFileFromBlob(res.body,
            this.langCode === 'vi' ? `BM05T-bieu-mau-hop-dong-thuc-hien-de-tai(${maSo}).docx`
              : `BM05T-contract-to-implement-the-project(${maSo}).docx`);
          this.spinner.hide();
        });
    } else {
      this.alert.warning(this.languageData[this.langCode].NOT_TOPIC_CODES);
    }

  }

  clickUploadMCHopDong(idDetai: string): void {
    this.selectedDeTaiId = idDetai; // nhớ truyền ID bên uploadMCHopDong() HTML
    this.uploadHopHong.nativeElement.click();
  }

  // uploadMinhChungHopDong(file: File): void {
  //   this.fileSvc.uploadFile(file)
  //     .subscribe(() => {
  //       // res.id
  //     }, () => this.isUploading = false);
  // }


  convertFileFromBlob(data: Blob, fileName: string) {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  // clickUploadFileImportSinhVien() {
  //   this.uploadHopHong.nativeElement.click();
  // }

  uploadMinhChungHopDong(file: File): void {
    this.spinner.show();
    this.fileSvc.uploadFile(file).subscribe(resFile => {
      this.deTaiSvc.uploadMinhChungHopDong(this.selectedDeTaiId, resFile.id)
        .subscribe(() => {
          this.getDeTaiBytrangThai();
          this.spinner.hide();
          this.alert.success(MessageConstant[this.langCode].MSG_UPLOADED_DONE);
        }, () => { this.alert.success(MessageConstant[this.langCode].MSG_ERR_SYSTEM); });
    });
  }

}
