import { ThoiGianQuyTrinh } from './../../../core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { ThoiGianQuyTrinhService } from './../../../core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { Component, OnInit, TemplateRef, OnChanges, OnDestroy } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-de-tai',
  templateUrl: './list-de-tai.component.html',
  styleUrls: ['./list-de-tai.component.scss']
})
export class ListDeTaiComponent implements OnInit, OnChanges, OnDestroy {

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

  private sub = this.router.events.subscribe((event: Event) => {
    if (event instanceof NavigationEnd) {
      this.checkLinkToCancelTopic();
    }
  });

  constructor(
    private modalService: NzModalService,
    private alert: ToastrService,
    private deTaiSvc: DeTaiAdminService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRouterSvc: ActivatedRoute,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
  ) {
    this.sub.add();
  }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PERFORMING_PROGRESS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].TOPICS,
        link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN
      }
    ];
    this.currentIdUrl = this.activatedRouterSvc.snapshot.params.id;
    this.getDeTaiBytrangThai(this.trangThaiDefault);
    this.checkLinkToCancelTopic();
    this.getAllTimeline();
    this.getTimelineActive();
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getDeTaiByStatusAndTimeLine(this.trangThaiDefault, searchValue);
      });
    this.searchTimelineValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getAllTimeline(searchValue);
      });
  }

  ngOnChanges() {
    // if (this.activatedRouterSvc.snapshot.params.id !== this.currentIdUrl) {
    //   this.checkLinkToCancelTopic();
    // }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTimelineActive() {
    this.thoiGianQuyTrinhSvc.getThoiGianQuyTrinhActive()
      .subscribe(res => {
        this.thoiGianQuyTrinhDefault = res[0].id;
        this.getDeTaiByStatusAndTimeLine(this.trangThaiDefault);
      });
  }

  getAllTimeline(search?: string) {
    this.thoiGianQuyTrinhSvc.getAllPagingThoiGianQuyTrinh(0, 10, search)
      .subscribe(res => {
        this.listThoiGianQuyTrinh = res.content;
      });
  }

  checkLinkToCancelTopic() {
    if (window.location.pathname.split('/').pop() === 'performing-progress') {
      this.isShow = false;
      this.trangThaiDefault = SystemConstant.TRANG_THAI_DE_TAI.KY_HOP_DONG;
      this.currentTab = 0;
    } else {
      this.mainTabIndex = 1;
      this.trangThaiDefault = SystemConstant.TRANG_THAI_DE_TAI.XIN_HUY;
      this.deTaiSvc.getAllDeTaiPaging(
        SystemConstant.TRANG_THAI_DE_TAI.XIN_HUY,
        this.listDeTai.currentPage - 1,
        this.listDeTai.limit)
        .subscribe(res => {
          this.listDeTai.data = res.content;
          this.listDeTai.totalItem = res.totalElements;
          this.listDeTai.totalPage = res.totalPages;
          this.listDeTai.limit = res.pageable.pageSize;
          if (this.listDeTai.data.findIndex(x => x.id === this.activatedRouterSvc.snapshot.params.id) !== -1) {
            this.deTaiSvc.getDeTaiById(this.activatedRouterSvc.snapshot.params.id)
              .subscribe(resDeTai => {
                this.currentTab = 3;
                this.toggleShow(resDeTai, this.listDeTai.data.findIndex(x => x.id === this.activatedRouterSvc.snapshot.params.id));
              });
          } else {
            this.alert.warning('Đề tài đã được xử lý');
            this.spinner.hide();
            this.isShow = false;
          }
        });
    }
  }

  getDeTaiBytrangThai(trangThai: string, searchValue?: string) {
    this.deTaiSvc.getAllDeTaiPaging(
      trangThai,
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

  getDeTaiByStatusAndTimeLine(trangThaiDeTai: string, searchValue?: string) {
    this.deTaiSvc.getDetaiByTimeLineAndStatus(
      this.thoiGianQuyTrinhDefault,
      [trangThaiDeTai],
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
    this.getDeTaiBytrangThai(this.trangThaiDefault);
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
      this.getDeTaiBytrangThai(this.trangThaiDefault);
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
    this.spinner.show();
    if (this.trangThaiDefault === SystemConstant.TRANG_THAI_DE_TAI.XIN_HUY) {
      this.currentTab = 3;
    }
    setTimeout(() => {
      this.modalDataDeTai.data = deTai;
      this.modalDataBaoCao.data = deTai.id;
      this.listDeTai.data.map(x => x.isShow = false);
      this.indexToggleShowBottomForm = index;
      this.listDeTai.data[index].isShow = true;
      this.isShow = true;
      this.spinner.hide();
    }, 100);

  }

  toggleHide(index: number) {
    this.isShow = false;
    this.listDeTai.data.map(x => x.isShow = false);
    this.indexToggleShowBottomForm = index;
    this.listDeTai.data[index].isShow = false;
  }

  changeStatus(trangThaiDefault: string) {
    this.isShow = false;
    this.trangThaiDefault = trangThaiDefault;
    this.getDeTaiBytrangThai(trangThaiDefault);
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
      this.getDeTaiByStatusAndTimeLine(trangThaiDeTai);
    }, 300);
  }
}
