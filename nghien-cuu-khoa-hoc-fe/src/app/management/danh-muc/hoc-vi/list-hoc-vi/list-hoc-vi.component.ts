import { Component, OnInit, TemplateRef } from '@angular/core';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { HocVi } from 'src/app/core/models/management/danh-muc/hoc-vi.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { HocViService } from 'src/app/core/services/management/danh-muc/hoc-vi.service';
import { ToastrService } from 'ngx-toastr';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { LanguageConstant } from 'src/app/core/constants/language.constant';

@Component({
  selector: 'app-list-hoc-vi',
  templateUrl: './list-hoc-vi.component.html',
  styleUrls: ['./list-hoc-vi.component.scss']
})
export class ListHocViComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<HocVi> = new ModalData<HocVi>();

  // table
  loading = true;
  listHocVi: Paginate<HocVi> = new Paginate<HocVi>();
  searchValue = '';

  constructor(
    private hocViSvc: HocViService,
    private modalService: NzModalService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].DEGREE;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];

    this.getAllDataPaging();
  }

  onSearch() {
    this.listHocVi.currentPage = 1;
    this.getAllDataPaging();
  }

  getAllDataPaging() {
    this.loading = true;
    // eslint-disable-next-line max-len
    // this.listHocVi.data = [{ id: '1', tenHocVi: 'Giáo Sư', tenHocViEn: 'Giáo Sư', tenVietTat: 'GS.', tenVietTatEn: 'GS.', trangThai: true }];
    // this.listHocVi.totalItem = 1;
    // this.listHocVi.totalPage = 1;
    // this.listHocVi.limit = 5;
    // this.loading = false;
    this.hocViSvc.findAllPaging(
      this.listHocVi.currentPage - 1,
      this.listHocVi.limit,
      this.searchValue)
      .subscribe(res => {
        this.listHocVi.data = res.content;
        this.listHocVi.totalItem = res.totalElements;
        this.listHocVi.totalPage = res.totalPages;
        this.listHocVi.limit = res.pageable.pageSize;
        this.loading = false;
      },
      () => {
        this.listHocVi.data = [];
        this.loading = false;
      });
  }
  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: HocVi, modalWidth?: number) {
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
        this.hocViSvc.delete(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
            this.getAllDataPaging();
          });
      }
    });
  }

  pageChanged(page: Paginate<HocVi>) {
    this.listHocVi = page;
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
