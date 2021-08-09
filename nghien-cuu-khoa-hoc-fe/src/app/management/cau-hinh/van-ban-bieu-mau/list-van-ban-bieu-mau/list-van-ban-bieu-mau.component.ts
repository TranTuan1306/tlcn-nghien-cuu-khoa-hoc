import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { VanBanBieuMau } from 'src/app/core/models/management/cau-hinh/van-ban-bieu-mau.model';
import { VanBanBieuMauService } from 'src/app/core/services/management/cau-hinh/van-ban-bieu-mau.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-van-ban-bieu-mau',
  templateUrl: './list-van-ban-bieu-mau.component.html',
  styleUrls: ['./list-van-ban-bieu-mau.component.scss']
})
export class ListVanBanBieuMauComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<VanBanBieuMau> = new ModalData<VanBanBieuMau>();

  // table
  tableLoading = true;
  listVanBanBieuMau: Paginate<VanBanBieuMau> = new Paginate<VanBanBieuMau>();
  searchValue = '';

  constructor(
    private vanBanBieuMauSvc: VanBanBieuMauService,
    private modalService: NzModalService,
    private alert: ToastrService
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].DOCS_FORM;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];
    this.getAllDataPaging();
  }

  onSearch() {
    this.listVanBanBieuMau.currentPage = 1;
    this.getAllDataPaging();
  }

  getAllDataPaging() {
    this.tableLoading = true;
    this.vanBanBieuMauSvc.getAllPagingVanBan(
      this.listVanBanBieuMau.currentPage - 1,
      this.listVanBanBieuMau.limit,
      this.searchValue
    ).subscribe(res => {
      this.listVanBanBieuMau.data = res.content;
      this.listVanBanBieuMau.totalItem = res.totalElements;
      this.listVanBanBieuMau.totalPage = res.totalPages;
      this.listVanBanBieuMau.limit = res.pageable.pageSize;
      this.tableLoading = false;
    });
  }
  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: VanBanBieuMau, modalWidth?: number) {
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
        this.vanBanBieuMauSvc.deleteVanBan(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
            this.getAllDataPaging();
          });
      }
    });
  }

  pageChanged(page: Paginate<VanBanBieuMau>) {
    this.listVanBanBieuMau = page;
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
      this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
    }
    this.modalRef.destroy();
  }

}
