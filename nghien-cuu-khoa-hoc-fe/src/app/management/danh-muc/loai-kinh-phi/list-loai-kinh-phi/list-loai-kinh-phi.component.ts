import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LoaiKinhPhi } from 'src/app/core/models/management/danh-muc/kinh-phi.model';
import { LoaiKinhPhiService } from 'src/app/core/services/management/danh-muc/loai-kinh-phi.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-loai-kinh-phi',
  templateUrl: './list-loai-kinh-phi.component.html',
  styleUrls: ['./list-loai-kinh-phi.component.scss']
})
export class ListLoaiKinhPhiComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<LoaiKinhPhi> = new ModalData<LoaiKinhPhi>();

  // table
  loadingTable = true;
  listLoaiKinhPhi: Paginate<LoaiKinhPhi> = new Paginate<LoaiKinhPhi>();

  searchValue = '';

  constructor(
    private modalService: NzModalService,
    private alert: ToastrService,
    private loaiKinhPhiSvc: LoaiKinhPhiService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].EXPENSE_TYPE;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];

    this.getAllDataPaging();
  }

  onSearch() {
    this.listLoaiKinhPhi.currentPage = 1;
    this.getAllDataPaging();
  }

  getAllDataPaging() {
    // this.loadingTable = true;
    // this.listLoaiKinhPhi.data = [];
    // this.listLoaiKinhPhi.totalItem = 4;
    // this.listLoaiKinhPhi.totalPage = 1;
    // this.listLoaiKinhPhi.limit = 10;
    // this.loadingTable = false;
    this.loaiKinhPhiSvc.findAllPaging(
      this.listLoaiKinhPhi.currentPage - 1,
      this.listLoaiKinhPhi.limit,
      this.searchValue)
      .subscribe(res => {
        this.listLoaiKinhPhi.data = res.content;
        this.listLoaiKinhPhi.totalItem = res.totalElements;
        this.listLoaiKinhPhi.totalPage = res.totalPages;
        this.listLoaiKinhPhi.limit = res.pageable.pageSize;
        this.loadingTable = false;
      });
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: LoaiKinhPhi, modalWidth?: number) {
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
        console.log(id);
      }
    });
  }

  pageChanged(page: Paginate<LoaiKinhPhi>) {
    this.listLoaiKinhPhi = page;
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
