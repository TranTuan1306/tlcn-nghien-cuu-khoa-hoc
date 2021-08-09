import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { ThoiGianQuyTrinhService } from 'src/app/core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-thoi-gian-quy-trinh',
  templateUrl: './list-thoi-gian-quy-trinh.component.html',
  styleUrls: ['./list-thoi-gian-quy-trinh.component.scss']
})
export class ListThoiGianQuyTrinhComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal
  modalDefaultWidth = 800;
  modalRef: NzModalRef;

  loadingTable = true;
  listThoiGianQuyTrinh: Paginate<ThoiGianQuyTrinh> = new Paginate<ThoiGianQuyTrinh>();

  modalData: ModalData<ThoiGianQuyTrinh> = new ModalData<ThoiGianQuyTrinh>();
  searchValue = '';
  isSearch = false;

  constructor(
    private modalService: NzModalService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PROGRESS_TIMELINE;
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
    this.thoiGianQuyTrinhSvc.getAllPagingThoiGianQuyTrinh(
      this.listThoiGianQuyTrinh.currentPage - 1,
      this.listThoiGianQuyTrinh.limit,
      this.searchValue)
      .subscribe(res => {
        this.listThoiGianQuyTrinh.data = res.content;
        this.listThoiGianQuyTrinh.totalItem = res.totalElements;
        this.listThoiGianQuyTrinh.totalPage = res.totalPages;
        this.listThoiGianQuyTrinh.limit = res.pageable.pageSize;
        this.loadingTable = false;
      },
      () => {
        this.listThoiGianQuyTrinh.data = [];
        this.loadingTable = false;
      });
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: ThoiGianQuyTrinh, modalWidth?: number) {
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

  pageChanged(page: Paginate<ThoiGianQuyTrinh>) {
    this.listThoiGianQuyTrinh = page;
    this.getAllPaging();
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number, customTitle?: string): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: customTitle ? customTitle :
        ((this.modalData.action === SystemConstant.ACTION.ADD ? this.languageData[this.langCode].CREATING
          : this.languageData[this.langCode].EDITING) + this.breadcrumbObj.heading),
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
    this.listThoiGianQuyTrinh.currentPage = 1;
    this.getAllPaging();
  }

}
