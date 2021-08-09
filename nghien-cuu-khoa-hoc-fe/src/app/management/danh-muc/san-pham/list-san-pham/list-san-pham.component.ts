import { Component, OnInit, TemplateRef } from '@angular/core';
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
import { SanPham } from 'src/app/core/models/management/danh-muc/san-pham.model';
import { SanPhamService } from 'src/app/core/services/management/danh-muc/san-pham.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-san-pham',
  templateUrl: './list-san-pham.component.html',
  styleUrls: ['./list-san-pham.component.scss']
})
export class ListSanPhamComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////
  systemConstant = SystemConstant;
  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<SanPham> = new ModalData<SanPham>();

  // table
  tableLoading = true;
  listSanPham: Paginate<SanPham> = new Paginate<SanPham>();
  searchValue = '';
  searchValueTextChanged = new Subject<string>();

  constructor(
    private sanPhamSvc: SanPhamService,
    private modalService: NzModalService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PRODUCT;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getAllDataPaging(searchValue);
      });
    this.getAllDataPaging();
  }
  getAllDataPaging(search?: string) {
    this.tableLoading = true;
    this.sanPhamSvc.getAllPagingSanPham(
      this.listSanPham.currentPage - 1,
      this.listSanPham.limit,
      search)
      .subscribe(res => {
        this.listSanPham.data = res.content;
        this.listSanPham.totalItem = res.totalElements;
        this.listSanPham.totalPage = res.totalPages;
        this.listSanPham.limit = res.pageable.pageSize;
        this.tableLoading = false;
      });
  }

  onSearch() {
    this.listSanPham.currentPage = 1;
    this.getAllDataPaging();
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: SanPham, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = data;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalDelete(id: string) {
    this.modalService.confirm({
      nzWidth: 300,
      nzTitle: MessageConstant[this.langCode].MSG_CONFIRM_DEACTIVE,
      nzContent: MessageConstant[this.langCode].MSG_CONFIRM_DEACTIVE_TITLE,
      nzOkText: MessageConstant[this.langCode].BTN_OK,
      nzCancelText: MessageConstant[this.langCode].BTN_CANCEL,
      nzOnOk: () => {
        this.sanPhamSvc.deleteSanPham(id)
          .subscribe(() => {
            this.getAllDataPaging();
            this.alert.success(MessageConstant[this.langCode].MSG_DEACTIVE_DONE);
          });
      }
    });
  }

  pageChanged(page: Paginate<SanPham>) {
    this.listSanPham = page;
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
    this.getAllDataPaging();
    if (status) {
      this.getAllDataPaging();
      // this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
    }
    this.modalRef.destroy();
  }

}
