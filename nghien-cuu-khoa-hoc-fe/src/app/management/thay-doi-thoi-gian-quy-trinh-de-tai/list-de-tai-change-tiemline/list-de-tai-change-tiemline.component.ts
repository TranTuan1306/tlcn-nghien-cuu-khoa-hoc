import { NgxSpinnerService } from 'ngx-spinner';
import { ThoiGianQuyTrinh } from './../../../core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { ThoiGianQuyTrinhService } from './../../../core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-de-tai-change-tiemline',
  templateUrl: './list-de-tai-change-tiemline.component.html',
  styleUrls: ['./list-de-tai-change-tiemline.component.scss']
})
export class ListDeTaiChangeTiemlineComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  //System contant
  listTrangThaiDetai = SystemConstant.TRANG_THAI_DE_TAI_TITLE;

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<ThoiGianQuyTrinh> = new ModalData<ThoiGianQuyTrinh>();
  modalDataBaoCao: ModalData<string> = new ModalData<string>();

  // chọn đề tài
  checked = false;
  indeterminate = false;
  listOfCurrentPageDeTai: [] = []; //model là đề tài đã được ký hợp đồng
  setOfCheckedId = new Set<string>();
  currentIdUrl = '';

  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();

  searchValue = '';
  isShow = false;
  indexToggleShowBottomForm = 0;
  currentTab = 0;

  listThoiGianQuyTrinh: ThoiGianQuyTrinh[] = [];
  thoiGianQuyTrinhDefault = '';

  searchValueTextChanged = new Subject<string>();
  searchValueTimelineTextChanged = new Subject<string>();
  deTaiId = '';

  constructor(
    private modalService: NzModalService,
    private deTaiSvc: DeTaiAdminService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PERFORMING_PROGRESS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].TOPICS,
        link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN
      }
    ];
    this.searchValueTimelineTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getThoiGianQuyTrinhAll(searchValue);
      });
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getDeTaiByTrangThaiVathoiGianQuyTrinh(searchValue);
      });
    this.getThoiGianQUyTrinhActive();
    this.getThoiGianQuyTrinhAll();
  }

  getThoiGianQuyTrinhAll(search?: string) {
    this.thoiGianQuyTrinhSvc.getAllPagingThoiGianQuyTrinh(0, 10, search)
      .subscribe(res => {
        this.listThoiGianQuyTrinh = res.content;
      });
  }

  getThoiGianQUyTrinhActive() {
    this.thoiGianQuyTrinhSvc.getThoiGianQuyTrinhActive()
      .subscribe(res => {
        this.thoiGianQuyTrinhDefault = res[0].id;
        this.getDeTaiByTrangThaiVathoiGianQuyTrinh();
      });
  }

  getDeTaiByTrangThaiVathoiGianQuyTrinh(searchValue?: string) {
    this.deTaiSvc.getDetaiByTimeLineAndStatus(
      this.thoiGianQuyTrinhDefault,
      [
        SystemConstant.TRANG_THAI_DE_TAI.MOI_DANG_KY,
        SystemConstant.TRANG_THAI_DE_TAI.YEU_CAU_CHINH_SUA_KHOA,
        SystemConstant.TRANG_THAI_DE_TAI.DA_CHINH_SUA_KHOA,
        SystemConstant.TRANG_THAI_DE_TAI.DAT_KHOA,
        SystemConstant.TRANG_THAI_DE_TAI.YEU_CAU_CHINH_SUA_KHCN,
        SystemConstant.TRANG_THAI_DE_TAI.DA_CHINH_SUA_KHCN,
        SystemConstant.TRANG_THAI_DE_TAI.DAT_KHCN,
        SystemConstant.TRANG_THAI_DE_TAI.DAT_XET_DUYET,
        SystemConstant.TRANG_THAI_DE_TAI.KY_HOP_DONG
      ],
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit,
      searchValue)
      .subscribe(res => {
        this.listDeTai.data = res.content;
        this.listDeTai.totalItem = res.totalElements;
        this.listDeTai.totalPage = res.totalPages;
        this.listDeTai.limit = res.pageable.pageSize;
      });
  }

  pageChanged(page: Paginate<DeTai>) {
    this.listDeTai = page;
    this.getDeTaiByTrangThaiVathoiGianQuyTrinh();
  }

  openModal(template: TemplateRef<unknown>, data: DeTai, modalWidth: number): void {
    this.spinner.show();
    setTimeout(() => {
      this.modalData.data = data.thoiGianQuyTrinh;
      this.deTaiId = data.id;
      this.modalRef = this.modalService.create({
        nzWidth: modalWidth,
        nzTitle: (this.languageData[this.langCode].EDITING + this.languageData[this.langCode].PROGRESS_TIMELINE),
        nzContent: template,
        nzFooter: null,
        nzMaskClosable: false,
        nzClosable: true,
        // nzOnOk: () => this.closeModal(),
        // nzOnCancel: () => this.closeModal()
      });
    }, 200);
  }

  closeModal(status: boolean): void {
    if (status) {
      this.getDeTaiByTrangThaiVathoiGianQuyTrinh();
    }
    this.modalRef.destroy();
  }

  changeStatus(idThoiGianQyTrinh: string) {
    this.thoiGianQuyTrinhDefault = idThoiGianQyTrinh;
    this.getDeTaiByTrangThaiVathoiGianQuyTrinh();
  }

}
