import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { TinTuc } from 'src/app/core/models/management/danh-muc/tin-tuc.model';
import { TinTucService } from 'src/app/core/services/management/danh-muc/tin-tuc.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-tin-tuc',
  templateUrl: './list-tin-tuc.component.html',
  styleUrls: ['./list-tin-tuc.component.scss']
})
export class ListTinTucComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<TinTuc> = new ModalData<TinTuc>();

  // table
  loading = true;
  listTinTuc: Paginate<TinTuc> = new Paginate<TinTuc>();
  searchValue = '';

  constructor(
    private tinTucSvc: TinTucService,
    private modalService: NzModalService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].NEWS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];

    this.getAllDataPaging();
  }

  onSearch() {
    this.listTinTuc.currentPage = 1;
    this.getAllDataPaging();
  }

  getAllDataPaging() {
    this.loading = true;
    // eslint-disable-next-line max-len
    this.listTinTuc.data = [{ id: '1', loaiTinTuc: 'Thông báo khác', hinhAnh: 'ảnh đẹp', tieuDe: 'Test Tin tức', tieuDeEn: 'Test Tin tức En', noiDung: 'Nội dung tin tức', noiDungEn: 'Nội dung Tin tức En', trangThai: true }];
    this.listTinTuc.totalItem = 1;
    this.listTinTuc.totalPage = 1;
    this.listTinTuc.limit = 5;
    this.loading = false;
    /*this.tinTucSvc.findAllPaging(
      this.listTinTuc.currentPage - 1,
      this.listTinTuc.limit,
      this.searchValue)
      .subscribe(res => {
        this.listTinTuc.data = res.content;
        this.listTinTuc.totalItem = res.totalElements;
        this.listTinTuc.totalPage = res.totalPages;
        this.listTinTuc.limit = res.pageable.pageSize;
        this.loading = false;
      });*/
  }
  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: TinTuc, modalWidth?: number) {
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
        this.tinTucSvc.deleteTinTuc(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
          });
      }
    });
  }

  pageChanged(page: Paginate<TinTuc>) {
    this.listTinTuc = page;
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
