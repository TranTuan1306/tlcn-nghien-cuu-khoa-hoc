import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BoSungThuyetMinhBM06 } from 'src/app/core/models/bieu-mau/bm06-bo-sung-thuyet-minh';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { BoSungThuyetMinhService } from 'src/app/core/services/management/de-tai/bo-sung-thuyet-minh.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-bo-sung-thuyet-minh',
  templateUrl: './list-bo-sung-thuyet-minh.component.html',
  styleUrls: ['./list-bo-sung-thuyet-minh.component.scss']
})
export class ListBoSungThuyetMinhComponent implements OnInit {

  @Input() modalDataBoSungThuyetMinh: ModalData<BoSungThuyetMinhBM06>;
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
  modalData: ModalData<BoSungThuyetMinhBM06> = new ModalData<BoSungThuyetMinhBM06>();

  // table
  listBoSungThuyetMinh: Paginate<BoSungThuyetMinhBM06> = new Paginate<BoSungThuyetMinhBM06>();
  searchValue = '';
  tableLoading = true;


  constructor(
    private modalService: NzModalService,
    private boSungThuyetMinhSvc: BoSungThuyetMinhService,
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
    //  this.listBoSungThuyetMinh.data = [{ id: '1',  }];
    this.listBoSungThuyetMinh.totalItem = 1;
    this.listBoSungThuyetMinh.totalPage = 1;
    this.listBoSungThuyetMinh.limit = 5;
    this.tableLoading = false;
    /*this.boSungThuyetMinhSvc.getAllPagingBoSungThuyetMinh(
      this.listBoSungThuyetMinh.currentPage - 1,
      this.listBoSungThuyetMinh.limit,
      this.searchValue)
      .subscribe(res => {
        this.listBoSungThuyetMinh.data = res.content;
        this.listBoSungThuyetMinh.totalItem = res.totalElements;
        this.listBoSungThuyetMinh.totalPage = res.totalPages;
        this.listBoSungThuyetMinh.limit = res.pageable.pageSize;
        this.tableLoading = false;
      });*/
  }

  onSearch() {
    this.listBoSungThuyetMinh.currentPage = 1;
    this.getAllDataPaging();
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: BoSungThuyetMinhBM06, modalWidth?: number) {
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
        this.boSungThuyetMinhSvc.deleteBoSungThuyetMinh(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
          });
      }
    });
  }

  pageChanged(page: Paginate<BoSungThuyetMinhBM06>) {
    this.listBoSungThuyetMinh = page;
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
