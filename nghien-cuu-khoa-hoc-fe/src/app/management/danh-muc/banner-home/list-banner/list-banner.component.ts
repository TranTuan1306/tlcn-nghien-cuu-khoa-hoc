import { NgxSpinnerService } from 'ngx-spinner';
import { BannerHomeService } from './../../../../core/services/management/danh-muc/banner.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { HomeBanner } from 'src/app/core/models/management/danh-muc/banner-home.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-banner',
  templateUrl: './list-banner.component.html',
  styleUrls: ['./list-banner.component.scss']
})
export class ListBannerComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalDefaultWidth = 800;
  modalRef: NzModalRef;
  modalData: ModalData<HomeBanner> = new ModalData<HomeBanner>();

  // table
  loadingTable = false;
  listBanner: Paginate<HomeBanner> = new Paginate<HomeBanner>();
  edittingOrder = false;
  searchValue = '';

  constructor(
    private modalService: NzModalService,
    private alert: ToastrService,
    private fileSvc: FileControllerService,
    private bannerSvc: BannerHomeService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].BANNER_HOME;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];
    this.getAllPaging();
  }

  getViewLink(idFile: string) {
    return this.fileSvc.getViewLink(idFile);
  }

  getAllPaging(valueSearch?: string) {
    this.loadingTable = true;
    this.bannerSvc.getAllPagingBanner(
      this.listBanner.currentPage - 1,
      this.listBanner.limit,
      valueSearch
    ).subscribe(res => {
      this.listBanner.data = res.content;
      this.listBanner.totalItem = res.totalElements;
      this.listBanner.totalPage = res.totalPages;
      this.listBanner.limit = res.pageable.pageSize;
      this.listBanner.currentPage = res.pageable.pageNumber + 1;
    });
    this.loadingTable = false;
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: HomeBanner, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = data;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalDelete(id: string) {
    this.modalService.confirm({
      nzWidth: 300,
      nzTitle: MessageConstant[this.langCode].MSG_CONFIRM_DEACTIVE_TITLE,
      nzContent: MessageConstant[this.langCode].MSG_CONFIRM_DEACTIVE,
      nzOkText: MessageConstant[this.langCode].BTN_OK,
      nzCancelText: MessageConstant[this.langCode].BTN_CANCEL,
      nzOnOk: () => {
        this.bannerSvc.changeStatusBanner(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DEACTIVE_DONE);
            this.spinner.show();
            setTimeout(() => {
              this.getAllPaging();
              this.spinner.hide();
            }, 300);
          });
      },
      nzOnCancel: () => this.getAllPaging()
    });
  }

  pageChanged(page: Paginate<HomeBanner>) {
    this.listBanner = page;
    this.getAllPaging();
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.modalService.create({
      nzStyle: { top: '10px' },
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
      this.getAllPaging();
    }
    this.modalRef.destroy();
  }

  onSearch() {
    this.listBanner.currentPage = 1;
    this.getAllPaging();
  }

  editOrder(): void {
    this.edittingOrder = true;
    // Reload + get all active
  }

  drangDropChangeOrder(event: CdkDragDrop<HomeBanner[]>, listData: HomeBanner[]): void {
    moveItemInArray(listData, event.previousIndex, event.currentIndex);
    listData = [...listData];
  }

  onSaveOrder(): void {
    const dataBanner = [...this.listBanner.data];
    const thuTu = [...Object.values(dataBanner).map(x => x.thuTu).sort((a, b) => Number(a) - Number(b))];
    this.listBanner.data.map((banner, i) => {
      banner.thuTu = thuTu[i];
      this.bannerSvc.updateBanner(banner, banner.id)
        .subscribe(() => {});
    });
    this.spinner.show();
    setTimeout(() => {
      this.edittingOrder = false;
      this.spinner.hide();
      this.getAllPaging();
    }, 300);
  }

  onCancelOrder(): void {
    this.edittingOrder = false;
  }

}
