import { HoiDongNghiemThu, ThanhVienHoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';

@Component({
  selector: 'app-form-nhan-xet-phan-bien',
  templateUrl: './form-nhan-xet-phan-bien.component.html',
  styleUrls: ['./form-nhan-xet-phan-bien.component.scss']
})
export class FormNhanXetPhanBienComponent implements OnInit {
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
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
  searchValue = '';
  listThanhVienHoiDong: ThanhVienHoiDongNghiemThu[] = [];
  hoiDongNghiemThuDaTa: HoiDongNghiemThu;
  searchValueTextChanged = new Subject<string>();
  fileId = '';

  constructor(
    private modalService: NzModalService,
    private activatedRouterSvc: ActivatedRoute,
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService
  ) {}

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].REVIEWER;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];
    this.getHoiDOngNghiemThuByIdHoiDong();
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.onSearch(searchValue);
      });
  }

  getHoiDOngNghiemThuByIdHoiDong() {
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuById(this.activatedRouterSvc.snapshot.params.id)
      .subscribe(res => {
        this.hoiDongNghiemThuDaTa = res;
        this.listThanhVienHoiDong = res.thanhVienHoiDongs;
      });
  }

  onSearch(search: string) {
    if (search !== '') {
      this.listThanhVienHoiDong = this.hoiDongNghiemThuDaTa.thanhVienHoiDongs.filter(
        x => x.hoTen.normalize().toUpperCase().includes(search.normalize().toUpperCase())
          || x.email.normalize().toUpperCase().includes(search.normalize().toUpperCase())
      );
    } else {
      this.listThanhVienHoiDong = this.hoiDongNghiemThuDaTa.thanhVienHoiDongs;
    }
  }

  modalCreateView(template: TemplateRef<unknown>, data: ThanhVienHoiDongNghiemThu, modalWidth?: number) {
    this.fileId = data.fileNhanXetPhanBien;
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: this.langCode === 'vi' ? 'Xem file' : 'View file',
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzOnOk: () => this.modalRef.close(),
      nzClosable: true,
    });
  }

  closeModal(status: boolean): void {
    if (status) {

    }
    this.modalRef.destroy();
  }

}
