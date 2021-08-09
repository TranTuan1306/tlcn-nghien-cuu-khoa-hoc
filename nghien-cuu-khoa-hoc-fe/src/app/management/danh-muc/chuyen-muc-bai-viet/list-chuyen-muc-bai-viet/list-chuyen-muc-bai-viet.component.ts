import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenMucBaiViet } from 'src/app/core/models/management/danh-muc/chuyen-muc-bai-viet.model';
import { ChuyenMucBaiVietService } from 'src/app/core/services/management/danh-muc/chuyen-muc-bai-viet.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-chuyen-muc-bai-viet',
  templateUrl: './list-chuyen-muc-bai-viet.component.html',
  styleUrls: ['./list-chuyen-muc-bai-viet.component.scss']
})
export class ListChuyenMucBaiVietComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<ChuyenMucBaiViet> = new ModalData<ChuyenMucBaiViet>();

  // table
  tableLoading = true;
  listChuyenMucBaiViet: Paginate<ChuyenMucBaiViet> = new Paginate<ChuyenMucBaiViet>();
  searchValue = '';

  constructor(
    private chuyenMucBaiVietSvc: ChuyenMucBaiVietService,
    private modalService: NzModalService,
    private alert: ToastrService
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].CATEGORIES_ARTICLES;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];

    this.getAllDataPaging();
  }

  onSearch() {
    this.listChuyenMucBaiViet.currentPage = 1;
    this.getAllDataPaging();
  }

  getAllDataPaging() {
    this.tableLoading = true;

    this.chuyenMucBaiVietSvc.getAllPagingChuyenMuc(
      this.listChuyenMucBaiViet.currentPage - 1,
      this.listChuyenMucBaiViet.limit,
      this.searchValue
    ).subscribe(res => {
      this.listChuyenMucBaiViet.data = res.content;
      this.listChuyenMucBaiViet.totalItem = res.totalElements;
      this.listChuyenMucBaiViet.totalPage = res.totalPages;
      this.listChuyenMucBaiViet.limit = res.pageable.pageSize;
      this.tableLoading = false;
    });
  }
  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: ChuyenMucBaiViet, modalWidth?: number) {
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
        this.chuyenMucBaiVietSvc.deleteChuyenMuc(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
            this.getAllDataPaging();
          });
      }
    });
  }

  pageChanged(page: Paginate<ChuyenMucBaiViet>) {
    this.listChuyenMucBaiViet = page;
    this.getAllDataPaging();
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
      this.getAllDataPaging();
    }
    this.modalRef.destroy();
  }

}
