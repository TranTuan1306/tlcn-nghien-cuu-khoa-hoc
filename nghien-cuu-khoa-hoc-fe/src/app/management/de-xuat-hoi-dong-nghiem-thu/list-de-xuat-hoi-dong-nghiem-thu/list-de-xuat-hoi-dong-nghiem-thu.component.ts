import { MessageTooltipConstant } from './../../../core/constants/message-tooltip.constant';
import { ThoiGianQuyTrinhService } from './../../../core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { HoiDongNghiemThu, ThanhVienHoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';

@Component({
  selector: 'app-list-de-xuat-hoi-dong-nghiem-thu',
  templateUrl: './list-de-xuat-hoi-dong-nghiem-thu.component.html',
  styleUrls: ['./list-de-xuat-hoi-dong-nghiem-thu.component.scss']
})
export class ListDeXuatHoiDongNghiemThuComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant[this.langCode];
  listTrangThaiHoiDongTitle = SystemConstant.TRANG_THAI_HOI_DONG_TITLE[this.langCode];

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();
  trangThaiDeTaiSystem = SystemConstant.TRANG_THAI_DE_TAI;
  trangThaiHoiDongNghiemThu = SystemConstant.TRANG_THAI_HOI_DONG;

  listTrangThaiDetai = SystemConstant.TRANG_THAI_DE_TAI_TITLE;

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<string> = new ModalData<string>();
  modalDataKiemDuyet: ModalData<DeTai> = new ModalData<DeTai>();
  modalDataDeXuat: ModalData<HoiDongNghiemThu> = new ModalData<HoiDongNghiemThu>();

  // table
  // lazyLoadingTable = true;
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();
  listHoiDongNghiemThu: Paginate<HoiDongNghiemThu> = new Paginate<HoiDongNghiemThu>();
  thoiGianQuyTrinhDefault = '';
  listThoiGianQuyTrinh: ThoiGianQuyTrinh[] = [];
  lazyLoadingTable = false;
  listThanhVienHoiDongView: ThanhVienHoiDongNghiemThu[] = [];

  //Search
  searchTimeProcessChanged = new Subject<string>();
  searchValueTextChanged = new Subject<string>();

  searchValue = '';
  trangThaiDeTais = [];
  trangThaiDeTaisTemp = [];
  currentTab = 0;
  truongDonVi = false;
  isShow = false;


  thoiGianQuyTrinhActive = '';

  constructor(
    private modalService: NzModalService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
    private spinner: NgxSpinnerService,
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PROPOSING_THE_ACCEPTANCE_COMMITTEE;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].TOPICS,
        link: UrlConstant.ROUTE.MANAGEMENT.DASHBOARD
      }
    ];
    this.lazyLoadingTable = true;
    this.getThoiGianQuyTrinhActive();
    this.getAllThoiGianQuyTrinhPaging();
    this.searchTimeProcessChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getAllThoiGianQuyTrinhPaging(searchValue);
      });
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        const listTrangThai = [SystemConstant.TRANG_THAI_HOI_DONG.KHOI_TAO
          , SystemConstant.TRANG_THAI_HOI_DONG.DE_XUAT_THANH_VIEN
          , SystemConstant.TRANG_THAI_HOI_DONG.DA_DUYET_THANH_VIEN];
        this.getAllHoiDongNghiemThuPagingByTDV(listTrangThai[this.currentTab], searchValue);
      });
  }

  getThoiGianQuyTrinhActive() {
    this.thoiGianQuyTrinhSvc.getThoiGianQuyTrinhActive()
      .subscribe(res => {
        this.thoiGianQuyTrinhDefault = res[0].id;
        this.getAllHoiDongNghiemThuPagingByTDV(SystemConstant.TRANG_THAI_HOI_DONG.KHOI_TAO);
      });
  }

  getAllThoiGianQuyTrinhPaging(searchValue?: string) {
    this.thoiGianQuyTrinhSvc.getAllPagingThoiGianQuyTrinh(0, 10, searchValue)
      .subscribe(res => {
        this.listThoiGianQuyTrinh = res.content;
      });
  }

  modalView(template: TemplateRef<unknown>, idDeTai: string, modalWidth?: number) {
    this.spinner.show();
    setTimeout(() => {
      this.modalData.action = SystemConstant.ACTION.VIEW;
      this.modalData.data = idDeTai;
      this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth, this.languageData[this.langCode].VIEW_AND_CENSORSHIP);
      // this.spinner.hide();
    }, 200);
  }

  modalKiemDuyet(template: TemplateRef<unknown>, deTai: DeTai, modalWidth?: number) {
    this.modalDataKiemDuyet.action = SystemConstant.ACTION.APPROVE;
    this.modalDataKiemDuyet.data = deTai;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth, this.languageData[this.langCode].REQUIRE_EDIT);
  }

  modalCreateBienBan(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth, 'Tạo biên bản');
  }

  modalEditBienBan(template: TemplateRef<unknown>, idDeTai: string, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = idDeTai;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth, 'Sủa biên bản');
  }

  modalDeleteBienBan(id: string) {
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

  modalCreateDiem(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth, 'Thêm điểm');
  }

  modalEditDiem(template: TemplateRef<unknown>, idDeTai: string, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = idDeTai;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth, 'Sửa điểm');
  }

  modalDeleteBDiem(id: string) {
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
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number, title: string): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: title,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      // nzOnOk: () => this.closeModal(),
      // nzOnCancel: () => this.closeModal()
    });
  }

  closeModal(returnData: { check: boolean; currentTab: number }): void {
    if (returnData.check) {
      const listTrangThai = [SystemConstant.TRANG_THAI_HOI_DONG.KHOI_TAO
        , SystemConstant.TRANG_THAI_HOI_DONG.DE_XUAT_THANH_VIEN
        , SystemConstant.TRANG_THAI_HOI_DONG.DA_DUYET_THANH_VIEN];
      this.getAllHoiDongNghiemThuPagingByTDV(listTrangThai[returnData.currentTab]);
    }
    this.modalRef.destroy();
  }

  getAllHoiDongNghiemThuPagingByTDV(trangThaiDuyetHoiDong: string, searchValue?: string) {
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuPagingByTDV(
      this.thoiGianQuyTrinhDefault,
      trangThaiDuyetHoiDong,
      this.listHoiDongNghiemThu.currentPage - 1,
      this.listHoiDongNghiemThu.limit,
      searchValue
    ).subscribe(res => {
      this.listHoiDongNghiemThu.data = res.content;
      this.listHoiDongNghiemThu.totalItem = res.totalElements;
      this.listHoiDongNghiemThu.totalPage = res.totalPages;
      this.listHoiDongNghiemThu.limit = res.pageable.pageSize;
      this.lazyLoadingTable = false;
    });
  }

  changeTab(trangThaiDuyetHoiDong: string, currTab: number) {
    this.searchValue = '';
    this.listHoiDongNghiemThu.data = [];
    this.lazyLoadingTable = true;
    this.currentTab = currTab;
    setTimeout(() => {
      this.getAllHoiDongNghiemThuPagingByTDV(trangThaiDuyetHoiDong);
    }, 400);
  }

  changeProcessTimeLine(thoiGianQuyTrinhId: string) {
    const listTrangThai = [SystemConstant.TRANG_THAI_HOI_DONG.KHOI_TAO
      , SystemConstant.TRANG_THAI_HOI_DONG.DE_XUAT_THANH_VIEN
      , SystemConstant.TRANG_THAI_HOI_DONG.DA_DUYET_THANH_VIEN];
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuPagingByTDV(
      thoiGianQuyTrinhId,
      listTrangThai[this.currentTab],
      this.listHoiDongNghiemThu.currentPage - 1,
      this.listHoiDongNghiemThu.limit,
      this.searchValue
    ).subscribe(res => {
      this.listHoiDongNghiemThu.data = res.content;
      this.listHoiDongNghiemThu.totalItem = res.totalElements;
      this.listHoiDongNghiemThu.totalPage = res.totalPages;
      this.listHoiDongNghiemThu.limit = res.pageable.pageSize;
    });
  }

  viewDanhSachThanhVienHoiDong(template: TemplateRef<unknown>, danhSach: ThanhVienHoiDongNghiemThu[]): void {
    this.truongDonVi = true;
    this.listThanhVienHoiDongView = danhSach;
    this.modalRef = this.modalService.create({
      nzWidth: 1200,
      nzTitle: this.languageData[this.langCode].COUNCIL_MENBERS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  modalPropose(template: TemplateRef<unknown>, data: HoiDongNghiemThu, modalWidth: number) {
    this.modalDataDeXuat.action = SystemConstant.ACTION.PROPOSE;
    this.modalDataDeXuat.data = data;
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: this.languageData[this.langCode].COUNCIL_MENBERS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  modalEdit(template: TemplateRef<unknown>, data: HoiDongNghiemThu, modalWidth: number) {
    this.modalDataDeXuat.action = SystemConstant.ACTION.EDIT;
    this.modalDataDeXuat.data = data;
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: this.languageData[this.langCode].COUNCIL_MENBERS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  downloadFileGioiThieu(hoiDongNghiemThu: HoiDongNghiemThu) {
    this.spinner.show();
    this.hoiDongNghiemThuSvc.exportDanhSachDeXuat(hoiDongNghiemThu.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM12T-danh-sach-gioi-thieu-thanh-vien-hoi-dong-nghiem-thu-de-tai(${hoiDongNghiemThu.tenHoiDong}).docx`
            : `BM12T-list-member-introduction-acceptance-board(${hoiDongNghiemThu.tenHoiDong}).docx`);
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

