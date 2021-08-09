import { Subject } from 'rxjs';
import { HoiDongNghiemThu } from './../../../core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThanhVienHoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-diem-thanh-vien-hoi-dong-tdv',
  templateUrl: './list-diem-thanh-vien-hoi-dong.component.html',
  styleUrls: ['./list-diem-thanh-vien-hoi-dong.component.scss']
})
export class ListDiemThanhVienHoiDongComponent implements OnInit {

  @Input() modalDataHoiDong: ModalData<HoiDongNghiemThu>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
  @Output() returnCurrentTab: EventEmitter<number> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant[this.langCode];
  listChucVuHoiDongTitle = SystemConstant.CHUC_VU_HOI_DONG_NGHIEM_THU_TITLE[this.langCode];

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  form: FormGroup;

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<ThanhVienHoiDongNghiemThu> = new ModalData<ThanhVienHoiDongNghiemThu>();
  hoiDongId: string;
  deTaiId: string;
  // table
  listBangDiemHoiDong: Paginate<ThanhVienHoiDongNghiemThu> = new Paginate<ThanhVienHoiDongNghiemThu>();
  searchValue = '';
  listThanhVienHoiDong: ThanhVienHoiDongNghiemThu[] = [];
  searchValueTextChanged = new Subject<string>();


  constructor(
    private modalService: NzModalService,
    private spinner: NgxSpinnerService,
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].REVIEWER;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];
    this.listThanhVienHoiDong = this.modalDataHoiDong.data.thanhVienHoiDongs;
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.onSearch(searchValue);
      });
  }

  onSearch(search: string) {
    if (search !== '') {
      this.listThanhVienHoiDong = this.modalDataHoiDong.data.thanhVienHoiDongs.filter(
        x => x.hoTen.normalize().toUpperCase().includes(search.normalize().toUpperCase())
          || x.email.normalize().toUpperCase().includes(search.normalize().toUpperCase())
      );
    } else {
      this.listThanhVienHoiDong = this.modalDataHoiDong.data.thanhVienHoiDongs;
    }
  }

  modalCreate(template: TemplateRef<unknown>, data: ThanhVienHoiDongNghiemThu, modalWidth?: number) {
    this.deTaiId = this.modalDataHoiDong.data.deTai.id;
    this.hoiDongId = this.modalDataHoiDong.data.id;
    this.modalData.data = data;
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: this.langCode === 'vi' ? 'Thêm minh chứng' : 'Add proof',
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzOnOk: () => this.modalRef.close(),
      nzOnCancel: () => this.modalRef.close()
    });
  }

  closeModal(status: boolean): void {
    if (status) {
      this.returnCurrentTab.emit(0);
      this.returnData.emit(true);
    }
    this.modalRef.destroy();
  }

  downloadFilePhieuDanhGiaThanhVien() {
    this.spinner.show();
    this.hoiDongNghiemThuSvc.exportPhieuDanhGiaNghiemThu(this.modalDataHoiDong.data.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM13T-phieu-danh-gia-nghiem-thu-de-tai-cho-thanh-vien(${this.modalDataHoiDong.data.tenHoiDong}).docx`
            : `BM13T-assessment-sheet-for-acceptance-of-the-topic(${this.modalDataHoiDong.data.tenHoiDong}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  downloadFilePhieuNhanXetPhanBien() {
    this.spinner.show();
    this.hoiDongNghiemThuSvc.exportPhieuDanhGiaNghiemThu(this.modalDataHoiDong.data.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM15T-phieu-nhan-xet-phan-bien-hoi-dong-nghiem-thu(${this.modalDataHoiDong.data.tenHoiDong}).docx`
            : `BM15T-assessment-form-reviewer-acceptance-board(${this.modalDataHoiDong.data.tenHoiDong}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }


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

}

