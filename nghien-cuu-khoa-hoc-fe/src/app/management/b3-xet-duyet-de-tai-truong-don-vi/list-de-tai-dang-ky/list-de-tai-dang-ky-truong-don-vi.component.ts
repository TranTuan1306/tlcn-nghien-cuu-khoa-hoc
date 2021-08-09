import { DeTaiAdminService } from '../../../core/services/management/de-tai/de-tai-admin.service';
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
  selector: 'app-list-de-tai-dang-ky-truong-don-vi',
  templateUrl: './list-de-tai-dang-ky-truong-don-vi.component.html',
  styleUrls: ['./list-de-tai-dang-ky-truong-don-vi.component.scss']
})
export class ListDeTaiDangKyTruongDonViComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();
  trangThaiDeTaiSystem = SystemConstant.TRANG_THAI_DE_TAI;

  listTrangThaiDetai = SystemConstant.TRANG_THAI_DE_TAI_TITLE;

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<string> = new ModalData<string>();
  modalDataKiemDuyet: ModalData<DeTai> = new ModalData<DeTai>();

  // table
  // loadingTable = true;
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();

  searchValue = '';
  trangThaiDeTais = [];
  trangThaiDeTaisTemp = [];
  currentTab = 0;
  searchValueTextChanged = new Subject<string>();

  thoiGianQuyTrinhActive = '';
  isShowSpin = false;

  constructor(
    private modalService: NzModalService,
    private deTaiSvc: DeTaiAdminService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].TOPICS_CENSORING_FACULTY;
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
    this.changeTab('MOI_DANG_KY', 0);
  }

  // getTimeLineActive() {
  //   this.spinner.show();
  //   this.thoiGianQuyTrinhSvc.getThoiGianQuyTrinhActive()
  //     .subscribe(res => {
  //       this.thoiGianQuyTrinhActive = res[0].id;
  //       this.changeTab('MOI_DANG_KY', 0);
  //       this.spinner.hide();
  //     }, () => this.spinner.hide());
  // }

  getAllDeTaiPaging(searchValue?: string): void {
    this.trangThaiDeTaisTemp = ['MOI_DANG_KY', 'YEU_CAU_CHINH_SUA_KHOA', 'DA_CHINH_SUA_KHOA', 'DAT_KHOA'];
    this.deTaiSvc.getDetaiByDonViVaTrangThaiPaging(
      this.trangThaiDeTaisTemp[this.currentTab],
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
    this.getAllDeTaiPaging();
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

  closeModal(status: boolean): void {
    if (status) {
      this.getAllDeTaiPaging();
    }
    this.modalRef.destroy();
  }

  changeTab(trangThaiDeTai: string, currTab: number) {
    this.isShowSpin = true;
    this.listDeTai.data = [];
    this.currentTab = currTab;
    setTimeout(() => {
      this.deTaiSvc.getDetaiByDonViVaTrangThaiPaging(trangThaiDeTai,
        this.listDeTai.currentPage - 1, this.listDeTai.limit, this.searchValue)
        .subscribe(res => {
          this.listDeTai.currentPage = res.pageable.pageNumber + 1;
          this.listDeTai.limit = res.pageable.pageSize;
          this.listDeTai.totalPage = res.totalPages;
          this.listDeTai.totalItem = res.totalElements;
          this.listDeTai.data = res.content;
          this.isShowSpin = false;
        }, () => this.listDeTai.data = []);
    }, 200);
  }
}
