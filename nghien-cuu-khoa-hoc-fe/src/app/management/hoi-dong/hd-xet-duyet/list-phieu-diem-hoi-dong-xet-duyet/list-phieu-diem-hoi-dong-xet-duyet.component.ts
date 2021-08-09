import { PhieuDiemThanhVienGet } from './../../../../core/models/management/hoi-dong/bien-ban-hoi-dong-tm-get.model';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, OnChanges } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { BienBanHoiDongThuyetMinhGet } from 'src/app/core/models/management/hoi-dong/bien-ban-hoi-dong-tm-get.model';

@Component({
  selector: 'app-list-phieu-diem-hoi-dong-xet-duyet',
  templateUrl: './list-phieu-diem-hoi-dong-xet-duyet.component.html',
  styleUrls: ['./list-phieu-diem-hoi-dong-xet-duyet.component.scss']
})
export class ListPhieuDiemHoiDongXetDuyetComponent implements OnInit, OnChanges {

  @Input() modalBieuDiemData: ModalData<BienBanHoiDongThuyetMinhGet> = new ModalData<BienBanHoiDongThuyetMinhGet>();
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
  @Output() returnBieuDiemData: EventEmitter<BienBanHoiDongThuyetMinhGet> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<PhieuDiemThanhVienGet> = new ModalData<PhieuDiemThanhVienGet>();
  viewModalRef: NzModalRef;

  checkBtnAddNew = false;
  // table

  selectedFileIdForView = '';
  searchValue = '';
  searchValueHoiDongKiemDuyet = new Subject<string>();
  searchValueBienBanHoiDong = new Subject<string>();
  bienBanHoiDongTM: BienBanHoiDongThuyetMinhGet;
  constructor(
    private modalService: NzModalService,
    // private spinner: NgxSpinnerService,
    // private alert: ToastrService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].BOARD_SCORE;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].BOARD_SCORE,
        link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG
      }
    ];
    this.checkShowBtnAddNew();
  }

  checkShowBtnAddNew() {
    if (this.modalBieuDiemData.data.phieuDiemThanhViens.length
      === this.modalBieuDiemData.data.hoiDongXetDuyet.thanhVienHoiDongs.length) {
      this.checkBtnAddNew = false;
    } else {
      this.checkBtnAddNew = true;
    }
  }

  ngOnChanges() {
    this.checkShowBtnAddNew();
  }


  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modaEdit(template: TemplateRef<unknown>, data: PhieuDiemThanhVienGet, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = data;
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

    }
    this.modalRef.destroy();
  }

  changeDataView(data: BienBanHoiDongThuyetMinhGet) {
    // this.bienBanHoiDongTM = data;
    this.modalBieuDiemData.data = data;
    this.checkShowBtnAddNew();
    this.returnBieuDiemData.emit();
  }

  onCancel() {
    this.returnData.emit(false);
  }

  openModalViewFile(template: TemplateRef<unknown>, fileId: string): void {
    this.selectedFileIdForView = fileId;
    this.viewModalRef = this.modalService.create({
      nzStyle: { top: '20px', width: '100%', maxWidth: '75vmin' },
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

}
