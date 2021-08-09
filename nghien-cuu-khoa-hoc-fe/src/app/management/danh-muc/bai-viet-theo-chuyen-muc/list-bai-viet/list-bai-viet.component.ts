import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { BaiVietTheoChuyenMuc } from 'src/app/core/models/management/danh-muc/bai-viet-theo-chuyen-muc.model';
import { ChuyenMucBaiViet } from 'src/app/core/models/management/danh-muc/chuyen-muc-bai-viet.model';
import { BaiVietTheoChuyenMucService } from 'src/app/core/services/management/danh-muc/bai-viet-theo-chuyen-muc.service';
import { ChuyenMucBaiVietService } from 'src/app/core/services/management/danh-muc/chuyen-muc-bai-viet.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-bai-viet',
  templateUrl: './list-bai-viet.component.html',
  styleUrls: ['./list-bai-viet.component.scss']
})
export class ListBaiVietComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<BaiVietTheoChuyenMuc> = new ModalData<BaiVietTheoChuyenMuc>();

  // table
  tableLoading = true;
  listBaiViet: Paginate<BaiVietTheoChuyenMuc> = new Paginate<BaiVietTheoChuyenMuc>();
  searchValue = '';

  //Chuyên mục
  selectedChuyenMucId = '';
  listChuyenMuc: ChuyenMucBaiViet[] = [];

  constructor(
    private baiVietSvc: BaiVietTheoChuyenMucService,
    private modalService: NzModalService,
    private alert: ToastrService,
    private chuyenMucBaiVietSvc: ChuyenMucBaiVietService) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].ARTICLES;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];

    this.getAllDataPaging();
  }

  onSearch() {
    this.listBaiViet.currentPage = 1;
    this.getAllDataPaging();
  }

  getAllDataPaging() {
    this.tableLoading = true;
    // eslint-disable-next-line max-len
    this.listBaiViet.data = [{ id: '1', idChuyenMuc: 'abc', tieuDe: 'Test tên chuyên mục', tieuDeEn: 'Test tên chuyên mục En', noiDung: 'áb', noiDungEn: 'sjgksj h', trangThai: true }];
    this.listBaiViet.totalItem = 1;
    this.listBaiViet.totalPage = 1;
    this.listBaiViet.limit = 5;
    this.tableLoading = false;
    /*this.baiVietSvc.findAllPaging(
      this.listBaiViet.currentPage - 1,
      this.listBaiViet.limit,
      this.searchValue)
      .subscribe(res => {
        this.listBaiViet.data = res.content;
        this.listBaiViet.totalItem = res.totalElements;
        this.listBaiViet.totalPage = res.totalPages;
        this.listBaiViet.limit = res.pageable.pageSize;
        this.tableLoading = false;
      });*/
  }
  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: BaiVietTheoChuyenMuc, modalWidth?: number) {
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
        this.baiVietSvc.deleteBaiViet(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
          });
      }
    });
  }

  pageChanged(page: Paginate<BaiVietTheoChuyenMuc>) {
    this.listBaiViet = page;
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

  getAllChuyenMucPaging(searchValue?: string) {
    this.chuyenMucBaiVietSvc.getAllPagingChuyenMuc(0, 10, searchValue)
      .subscribe(res => {
        this.listChuyenMuc = res.content;
      });
  }

  getBaiVietByChuyenMucId(idChuyenMuc: string) {
    this.tableLoading = false;
    this.baiVietSvc.getAllPagingBaiViet(
      idChuyenMuc,
      this.listBaiViet.currentPage - 1,
      this.listBaiViet.limit,
      this.searchValue)
      .subscribe(res => {
        this.listBaiViet.data = res.content;
        this.listBaiViet.totalItem = res.totalElements;
        this.listBaiViet.totalPage = res.totalPages;
        this.listBaiViet.limit = res.pageable.pageSize;
        this.tableLoading = false;
      });
  }
}
