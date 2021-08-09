import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BienBanKiemTraBM08 } from 'src/app/core/models/bieu-mau/bm08-bien-ban-kiem-tra.model';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { BienBanKiemTraService } from 'src/app/core/services/management/de-tai/bien-ban-kiem-tra.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-bien-ban-kiem-tra',
  templateUrl: './list-bien-ban-kiem-tra.component.html',
  styleUrls: ['./list-bien-ban-kiem-tra.component.scss']
})
export class ListBienBanKiemTraComponent implements OnInit {

  @Input() modalDataBienBanKiemtra: ModalData<BienBanKiemTraBM08>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<BienBanKiemTraBM08> = new ModalData<BienBanKiemTraBM08>();

  // table
  listBienBanKiemTra: Paginate<BienBanKiemTraBM08> = new Paginate<BienBanKiemTraBM08>();
  searchValue = '';
  tableLoading = true;


  constructor(
    private modalService: NzModalService,
    private bienBanKiemTraSvc: BienBanKiemTraService,
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
    //  this.listBienBanKiemTra.data = [{ id: '1',  }];
    this.listBienBanKiemTra.totalItem = 1;
    this.listBienBanKiemTra.totalPage = 1;
    this.listBienBanKiemTra.limit = 5;
    this.tableLoading = false;
    /*this.listBienBanKiemTra.getAllPagingBienBanKiemTra(
      this.listBienBanKiemTra.currentPage - 1,
      this.listBienBanKiemTra.limit,
      this.searchValue)
      .subscribe(res => {
        this.listBienBanKiemTra.data = res.content;
        this.listBienBanKiemTra.totalItem = res.totalElements;
        this.listBienBanKiemTra.totalPage = res.totalPages;
        this.listBienBanKiemTra.limit = res.pageable.pageSize;
        this.tableLoading = false;
      });*/
  }

  onSearch() {
    this.listBienBanKiemTra.currentPage = 1;
    this.getAllDataPaging();
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: BienBanKiemTraBM08, modalWidth?: number) {
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
        this.bienBanKiemTraSvc.deleteBienBanKiemTra(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
          });
      }
    });
  }

  pageChanged(page: Paginate<BienBanKiemTraBM08>) {
    this.listBienBanKiemTra = page;
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
