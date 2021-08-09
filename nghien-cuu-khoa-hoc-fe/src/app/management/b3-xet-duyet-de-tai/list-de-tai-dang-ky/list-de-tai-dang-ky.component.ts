import { ThoiGianQuyTrinhService } from 'src/app/core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { DeTaiAdminService } from './../../../core/services/management/de-tai/de-tai-admin.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-de-tai-dang-ky',
  templateUrl: './list-de-tai-dang-ky.component.html',
  styleUrls: ['./list-de-tai-dang-ky.component.scss']
})
export class ListDeTaiDangKyComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<string> = new ModalData<string>();
  modalDataKiemDuyet: ModalData<DeTai> = new ModalData<DeTai>();

  // table
  // loadingTable = true;
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();

  searchValue = '';
  trangThaiDeTai: string[] = [];
  trangThaiDeTaiTemp: string[] = [];
  currentTab = 0;

  thoiGianQuyTrinhActive = '';
  trangThaiDeTaiSystem = SystemConstant.TRANG_THAI_DE_TAI;
  searchValueTextChanged = new Subject<string>();

  listTrangThaiDetai = SystemConstant.TRANG_THAI_DE_TAI_TITLE;

  isShowSpin = false;

  constructor(
    private modalService: NzModalService,
    private deTaiSvc: DeTaiAdminService,
    private spinner: NgxSpinnerService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].TOPICS_CENSORING_SAT;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].TOPICS,
        link: UrlConstant.ROUTE.MANAGEMENT.DASHBOARD
      }
    ];
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getAllDeTaiPaging(searchValue);
      });
    this.getTimeLineActive();
  }

  getTimeLineActive() {
    this.spinner.show();
    this.thoiGianQuyTrinhSvc.getThoiGianQuyTrinhActive()
      .subscribe(res => {
        this.thoiGianQuyTrinhActive = res[0].id;
        this.changeTab(res[0].id, ['DAT_KHOA'], 0);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  onSearch() {
    this.listDeTai.currentPage = 1;
    // this.getAllDeTaiPaging();
  }

  getAllDeTaiPaging(searchValue?: string): void {
    this.trangThaiDeTaiTemp = ['DAT_KHOA', 'YEU_CAU_CHINH_SUA_KHCN', 'DA_CHINH_SUA_KHCN', 'DAT_KHCN'];
    this.deTaiSvc.getDetaiByTimeLineAndStatus(
      this.thoiGianQuyTrinhActive,
      [this.trangThaiDeTaiTemp[this.currentTab]],
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit,
      searchValue)
      .subscribe(res => {
        this.listDeTai.data = res.content;
        this.listDeTai.currentPage = res.pageable.pageNumber + 1;
        this.listDeTai.limit = res.pageable.pageSize;
        this.listDeTai.totalPage = res.totalPages;
        this.listDeTai.totalItem = res.totalElements;
        this.spinner.hide();
      }, () => {
        this.listDeTai.data = [];
        this.spinner.hide();
      });
  }

  modalView(template: TemplateRef<unknown>, idDeTai: string, modalWidth?: number) {
    this.spinner.show();
    setTimeout(() => {
      this.modalData.action = SystemConstant.ACTION.VIEW;
      this.modalData.data = idDeTai;
      this.modalData.title = this.languageData[this.langCode].VIEW_AND_CENSORSHIP;
      this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
      // this.spinner.hide();
    }, 200);
  }

  modalKiemDuyet(template: TemplateRef<unknown>, deTai: DeTai, modalWidth?: number) {
    this.modalDataKiemDuyet.action = SystemConstant.ACTION.APPROVE;
    this.modalDataKiemDuyet.title = this.languageData[this.langCode].REQUIRE_EDIT;
    this.modalDataKiemDuyet.data = deTai;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalCreateBienBan(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEditBienBan(template: TemplateRef<unknown>, idDeTai: string, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = idDeTai;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
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
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEditDiem(template: TemplateRef<unknown>, idDeTai: string, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = idDeTai;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
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
    this.getAllDeTaiPaging();
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
      this.getAllDeTaiPaging();
    }
    this.modalRef.destroy();
  }

  changeTab(thoiGianQuyTrinhId: string, trangThaiDeTais: string[], currTab: number) {
    this.isShowSpin = true;
    this.listDeTai.data = [];
    this.currentTab = currTab;
    setTimeout(() => {
      this.deTaiSvc.getDetaiByTimeLineAndStatus( thoiGianQuyTrinhId, trangThaiDeTais,
        this.listDeTai.currentPage - 1, this.listDeTai.limit, this.searchValue)
        .subscribe(res => {
          this.listDeTai.currentPage = res.pageable.pageNumber + 1;
          this.listDeTai.limit = res.pageable.pageSize;
          this.listDeTai.totalPage = res.totalPages;
          this.listDeTai.totalItem = res.totalElements;
          this.listDeTai.data = res.content;
          this.isShowSpin = false;
        }, () => () => this.listDeTai.data = []);
    }, 200);
  }
}
