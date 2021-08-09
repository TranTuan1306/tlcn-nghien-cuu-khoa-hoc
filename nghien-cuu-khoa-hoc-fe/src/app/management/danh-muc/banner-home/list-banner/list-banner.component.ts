import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
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
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
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

  getViewLink = this.fileSvc.getViewLink;

  constructor(
    private modalService: NzModalService,
    private alert: ToastrService,
    private fileSvc: FileControllerService,
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

  getAllPaging() {
    this.loadingTable = true;
    this.listBanner.data = [
      { id: '0', tieuDe: 'Banner 1', thuTu: 1, anhBanner: '123', trangThai: true },
      { id: '1', tieuDe: 'Banner 2', thuTu: 2, anhBanner: '123', trangThai: true }
    ];
    this.listBanner.totalItem = 1;
    this.listBanner.totalPage = 1;
    this.listBanner.limit = 1;
    this.listBanner.currentPage = 1;
    // this.thoiGianDangKyService.findAllPaging(
    //   this.listThoiGianQuyTrinh.currentPage - 1,
    //   this.listThoiGianQuyTrinh.limit, this.valueSearch
    // ).subscribe(
    //   res => {
    //     this.listThoiGianQuyTrinh.data = res.content;
    //     this.listThoiGianQuyTrinh.totalItem = res.totalElements;
    //     this.listThoiGianQuyTrinh.totalPage = res.totalPages;
    //     this.listThoiGianQuyTrinh.limit = res.pageable.pageSize;
    //     this.listThoiGianQuyTrinh.currentPage = res.pageable.pageNumber + 1;
    //   }
    // );
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
      nzTitle: MessageConstant[this.langCode].XAC_NHAN_XOA,
      nzContent: MessageConstant[this.langCode].MSG_CONFIRM_DEL,
      nzOkText: MessageConstant[this.langCode].BTN_OK,
      nzCancelText: MessageConstant[this.langCode].BTN_CANCEL,
      nzOnOk: () => {
        // Delete id
        console.log(id);
      }
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
      this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
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
    this.edittingOrder = false;
    // submit id + thuTu
  }

  onCancelOrder(): void {
    this.edittingOrder = false;
  }

}
