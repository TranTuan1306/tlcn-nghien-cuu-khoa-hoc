import { Component, OnInit, TemplateRef } from '@angular/core';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { ToastrService } from 'ngx-toastr';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { DeTaiService } from 'src/app/core/services/user/de-tai.service';

@Component({
  selector: 'app-list-de-tai',
  templateUrl: './list-de-tai.component.html',
  styleUrls: ['./list-de-tai.component.scss']
})
export class ListDeTaiComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<DeTai> = new ModalData<DeTai>();

  // table
  loadingTable = true;
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();

  searchValue = '';

  constructor(
    private modalService: NzModalService,
    private alert: ToastrService,
    private deTaiSvc: DeTaiService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PROPOSED_TOPICS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].TOPICS,
        link: UrlConstant.ROUTE.MANAGEMENT.DE_TAI
      }
    ];

    this.getAllDeTaiPaging();
  }

  onSearch() {
    this.listDeTai.currentPage = 1;
    this.getAllDeTaiPaging();
  }

  getAllDeTaiPaging(): void {
    this.loadingTable = true;
    this.deTaiSvc.getAllDeTaiPaging(
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit,
      this.searchValue)
      .subscribe(res => {
        this.listDeTai.data = res.content;
        this.listDeTai.totalItem = res.totalElements;
        this.listDeTai.totalPage = res.totalPages;
        this.listDeTai.limit = res.pageable.pageSize;
        this.loadingTable = false;
      },
      () => {
        this.listDeTai.data = [];
        this.loadingTable = false;
      });
  }

  modalView(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.VIEW;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalCreateBienBan(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEditBienBan(template: TemplateRef<unknown>, data: DeTai, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = data;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalDeleteBienBan(id: string) {
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
    this.getAllDeTaiPaging();
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
      this.getAllDeTaiPaging();
      this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
    }
    this.modalRef.destroy();
  }




}
