import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { OAuth2Service } from 'src/app/core/services/auth/oauth2.service';
import { ThoiGianQuyTrinhService } from 'src/app/core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-de-tai-xuat-file',
  templateUrl: './list-de-tai-xuat-file.component.html',
  styleUrls: ['./list-de-tai-xuat-file.component.scss']
})
export class ListDeTaiXuatFileComponent implements OnInit {


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
  modalData: ModalData<DeTai> = new ModalData<DeTai>();
  modalDataBaoCao: ModalData<string> = new ModalData<string>();

  trangThaiDetai = SystemConstant.TRANG_THAI_DE_TAI;
  trangThaiDefault = SystemConstant.TRANG_THAI_DE_TAI.KY_HOP_DONG;

  modalDataDeTai: ModalData<DeTai> = new ModalData<DeTai>();

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
  mainTabIndex = 0;

  thoiGianQuyTrinhDefault = '';
  listThoiGianQuyTrinh: ThoiGianQuyTrinh[] = [];
  searchValueTextChanged = new Subject<string>();
  searchTimelineValueTextChanged = new Subject<string>();
  lazyLoadingTable = false;
  fileViewId = '';

  dataTable: DeTai;
  showSpin = false;
  showSpinTabs = false;
  isShowHistory = false;    //show tab lịch sử file


  constructor(
    private modalService: NzModalService,
    private alert: ToastrService,
    private deTaiSvc: DeTaiAdminService,
    private activatedRouterSvc: ActivatedRoute,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
    private authService: OAuth2Service
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PERFORMING_PROGRESS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].TOPICS,
        link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN
      }
    ];
    if (this.authService.getAuthData()) {
      if (this.authService.checkRole(SystemConstant.ROLE_USER.ROLE_ADMIN)) {
        this.isShowHistory = true;
      } else if (this.authService.checkRole(SystemConstant.ROLE_USER.ROLE_TRUONG_DON_VI)) {
        this.isShowHistory = false;
      }
    }
    this.currentIdUrl = this.activatedRouterSvc.snapshot.params.id;
    this.getAllTimeline();
    this.getTimelineActive();
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getDeTaiByStatusAndTimeLine(searchValue);
      });
    this.searchTimelineValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getAllTimeline(searchValue);
      });
  }

  getTimelineActive() {
    this.thoiGianQuyTrinhSvc.getThoiGianQuyTrinhActive()
      .subscribe(res => {
        this.thoiGianQuyTrinhDefault = res[0].id;
        this.getDeTaiByStatusAndTimeLine();
      });
  }

  getAllTimeline(search?: string) {
    this.thoiGianQuyTrinhSvc.getAllPagingThoiGianQuyTrinh(0, 10, search)
      .subscribe(res => {
        this.listThoiGianQuyTrinh = res.content;
      });
  }

  getDeTaiByStatusAndTimeLine(searchValue?: string) {
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
        SystemConstant.TRANG_THAI_DE_TAI.HUY,
        SystemConstant.TRANG_THAI_DE_TAI.KY_HOP_DONG,
        SystemConstant.TRANG_THAI_DE_TAI.NGHIEM_THU,
        SystemConstant.TRANG_THAI_DE_TAI.XIN_HUY,
        SystemConstant.TRANG_THAI_DE_TAI.DAT_NGHIEM_THU,
        SystemConstant.TRANG_THAI_DE_TAI.KHONG_DAT_NGHIEM_THU,
        SystemConstant.TRANG_THAI_DE_TAI.DA_THANH_LY
      ],
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit,
      searchValue
    ).subscribe(res => {
      this.listDeTai.data = res.content;
      this.listDeTai.totalItem = res.totalElements;
      this.listDeTai.totalPage = res.totalPages;
      this.listDeTai.limit = res.pageable.pageSize;
      this.lazyLoadingTable = false;
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

  pageChanged(page: Paginate<DeTai>) {
    this.listDeTai = page;
    this.getDeTaiByStatusAndTimeLine();
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
      this.isShow = false;
      this.getDeTaiByStatusAndTimeLine();
      this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  // choose de tai
  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageDeTai;
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  toggleShow(deTai: DeTai, index: number) {
    this.isShow = false;
    this.dataTable = deTai;
    this.showSpin = true;
    setTimeout(() => {
      this.modalDataDeTai.data = deTai;
      this.modalDataBaoCao.data = deTai.id;
      this.listDeTai.data.map(x => x.isShow = false);
      this.indexToggleShowBottomForm = index;
      this.listDeTai.data[index].isShow = true;
      this.isShow = true;
      this.showSpin = false;
    }, 200);
  }

  toggleHide(index: number) {
    this.isShow = false;
    this.listDeTai.data.map(x => x.isShow = false);
    this.indexToggleShowBottomForm = index;
    this.listDeTai.data[index].isShow = false;
  }

  selectedIndexChange(tabNum: number) {
    if (tabNum) { }
  }

  changeTimeline(idTimeline: string) {
    this.thoiGianQuyTrinhDefault = idTimeline;
    this.getDeTaiByStatusAndTimeLine(this.trangThaiDefault);
  }

  changTab(trangThaiDeTai: string) {
    this.isShow = false;
    this.lazyLoadingTable = true;
    this.trangThaiDefault = trangThaiDeTai;
    this.listDeTai.data = [];
    setTimeout(() => {
      this.getDeTaiByStatusAndTimeLine();
    }, 300);
  }

  handleTitle(content: string): string {
    return 'File' + ' ' + content.toLowerCase();
  }

  changeTab() {
    this.showSpinTabs = true;
    setTimeout(() => {
      this.showSpinTabs = false;
    }, 500);
  }

}
