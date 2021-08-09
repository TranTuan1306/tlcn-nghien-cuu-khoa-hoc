import { Component, OnInit, TemplateRef } from '@angular/core';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { HocHamService } from 'src/app/core/services/management/danh-muc/hoc-ham.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { HocHam } from 'src/app/core/models/management/danh-muc/hoc-ham.model';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';

@Component({
  selector: 'app-list-hoc-ham',
  templateUrl: './list-hoc-ham.component.html',
  styleUrls: ['./list-hoc-ham.component.scss']
})
export class ListHocHamComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<HocHam> = new ModalData<HocHam>();

  // table
  loadingTable = true;
  listHocHam: Paginate<HocHam> = new Paginate<HocHam>();

  searchValue = '';

  constructor(
    private modalService: NzModalService,
    private alert: ToastrService,

    private hocHamSvc: HocHamService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].ACADEMIC_RANK;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];

    this.getAllDataPaging();
  }

  onSearch() {
    this.listHocHam.currentPage = 1;
    this.getAllDataPaging();
  }

  getAllDataPaging() {
    this.loadingTable = true;
    this.hocHamSvc.findAllPaging(
      this.listHocHam.currentPage - 1,
      this.listHocHam.limit,
      this.searchValue)
      .subscribe(res => {
        this.listHocHam.data = res.content;
        this.listHocHam.totalItem = res.totalElements;
        this.listHocHam.totalPage = res.totalPages;
        this.listHocHam.limit = res.pageable.pageSize;
        this.loadingTable = false;
      });

  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: HocHam, modalWidth?: number) {
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
        this.hocHamSvc.delete(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
            this.getAllDataPaging();
          });
      }
    });
  }

  pageChanged(page: Paginate<HocHam>) {
    this.listHocHam = page;
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
