import { Component, OnInit, TemplateRef } from '@angular/core';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { LinhVucNghienCuuService } from 'src/app/core/services/management/danh-muc/linh-vuc-nghien-cuu.service';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { ToastrService } from 'ngx-toastr';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { LinhVucNghienCuu } from 'src/app/core/models/management/danh-muc/linh-vuc-nghien-cuu.model';
import { LanguageConstant } from 'src/app/core/constants/language.constant';


@Component({
  selector: 'app-list-linh-vuc-nghien-cuu',
  templateUrl: './list-linh-vuc-nghien-cuu.component.html',
  styleUrls: ['./list-linh-vuc-nghien-cuu.component.scss'],
  providers: [LinhVucNghienCuuService]
})
export class ListLinhVucNghienCuuComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<LinhVucNghienCuu> = new ModalData<LinhVucNghienCuu>();

  // table
  listLinhVucNghienCuu: Paginate<LinhVucNghienCuu> = new Paginate<LinhVucNghienCuu>();
  searchValue = '';
  tableLoading = true;
  totalElements = 0;


  constructor(
    private modalService: NzModalService,
    private linhVucNghienCuuSvc: LinhVucNghienCuuService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].RESEARCH_DOMAIN;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DANH_MUC
      }
    ];

    this.getAllDataPaging();
  }

  getAllDataPaging() {
    this.tableLoading = true;
    this.linhVucNghienCuuSvc.findAllPaging(
      this.listLinhVucNghienCuu.currentPage - 1,
      this.listLinhVucNghienCuu.limit,
      this.searchValue)
      .subscribe(res => {
        this.totalElements = res.totalElements;
        this.listLinhVucNghienCuu.data = res.content.map(x=>({
          id: x.id,
          maLinhVuc: x.maLinhVuc,
          tenLinhVuc: x.tenLinhVuc,
          tenLinhVucEn: x.tenLinhVucEn,
          thuTu: x.thuTu,
          trangThai: x.trangThai,
          totalElements: this.totalElements,
        }));
        this.listLinhVucNghienCuu.totalItem = res.totalElements;
        this.listLinhVucNghienCuu.totalPage = res.totalPages;
        this.listLinhVucNghienCuu.limit = res.pageable.pageSize;
        this.tableLoading = false;
        console.log(this.listLinhVucNghienCuu.data);
      });
  }

  onSearch() {
    this.listLinhVucNghienCuu.currentPage = 1;
    this.getAllDataPaging();
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: LinhVucNghienCuu, modalWidth?: number) {
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
        this.linhVucNghienCuuSvc.delete(id)
          .subscribe(() => {
            this.getAllDataPaging();
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
          });
      }
    });
  }

  pageChanged(page: Paginate<LinhVucNghienCuu>) {
    this.listLinhVucNghienCuu = page;
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
      // this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
    }
    this.modalRef.destroy();
  }

}
