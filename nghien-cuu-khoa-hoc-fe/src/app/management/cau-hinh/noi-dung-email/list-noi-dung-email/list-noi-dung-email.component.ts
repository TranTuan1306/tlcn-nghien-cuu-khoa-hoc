import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { NoiDungEmail } from 'src/app/core/models/management/cau-hinh/noi-dung-email.model';
import { NoiDungEmailService } from 'src/app/core/services/management/cau-hinh/noi-dung-email.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-noi-dung-email',
  templateUrl: './list-noi-dung-email.component.html',
  styleUrls: ['./list-noi-dung-email.component.scss']
})
export class ListNoiDungEmailComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // breadcrumb
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // table
  valueSearch = '';
  listNoiDungEmail: Paginate<NoiDungEmail> = new Paginate<NoiDungEmail>();
  listLoaiEmail = SystemConstant.LOAI_EMAIL_TITLE[this.langCode];
  loadingTable = true;
  searchValue = '';

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData = new ModalData<NoiDungEmail>();

  constructor(
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
    private noiDungEmailSvc: NoiDungEmailService,
  ) { }

  ngOnInit(): void {
    // Breadcrumb
    this.breadcrumbObj.heading = this.languageData[this.langCode].CONTENT_EMAIL;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].SETTING,
        link: UrlConstant.ROUTE.MANAGEMENT.CONTENT_EMAIL
      }
    ];

    this.onGetAllPaging();
  }

  onGetAllPaging(): void {
    this.loadingTable = true;
    this.noiDungEmailSvc.getAllPagingNoiDungEmail(
      this.listNoiDungEmail.currentPage - 1,
      this.listNoiDungEmail.limit,
      this.valueSearch)
      .subscribe(res => {
        this.listNoiDungEmail.data = res.content;
        this.listNoiDungEmail.currentPage = res.pageable.pageNumber + 1;
        this.listNoiDungEmail.limit = res.pageable.pageSize;
        this.listNoiDungEmail.totalItem = res.totalElements;
        this.listNoiDungEmail.totalPage = res.totalPages;
        this.loadingTable = false;
      }, () => this.loadingTable = false);
  }

  onSearch(): void {
    this.listNoiDungEmail.currentPage = 1;
    this.onGetAllPaging();
  }

  onPageChange(paging: Paginate<NoiDungEmail>): void {
    this.listNoiDungEmail = paging;
    this.onGetAllPaging();
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: NoiDungEmail, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.EDIT;
    this.modalData.data = data;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalDelete(id: string) {
    this.nzModalSvc.confirm({
      nzWidth: 300,
      nzTitle: MessageConstant[this.langCode].XAC_NHAN_XOA,
      nzContent: MessageConstant[this.langCode].MSG_CONFIRM_DEL,
      nzOkText: MessageConstant[this.langCode].BTN_OK,
      nzCancelText: MessageConstant[this.langCode].BTN_CANCEL,
      nzOnOk: () => {
        this.noiDungEmailSvc.deleteNoiDungEmail(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
          });
      }
    });
  }

  pageChanged(page: Paginate<NoiDungEmail>) {
    this.listNoiDungEmail = page;
    this.onGetAllPaging();
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.nzModalSvc.create({
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

  // modalChangeStatus(id: string): void {
  //   this.nzModalSvc.confirm({
  //     nzWidth: 300,
  //     nzTitle: MessageConstant.vi.MSG_CONFIRM_DEACTIVE_TITLE,
  //     nzContent: MessageConstant.vi.MSG_CONFIRM_DEACTIVE,
  //     nzOkText: MessageConstant.vi.BTN_OK,
  //     nzCancelText: MessageConstant.vi.BTN_CANCEL,
  //     nzOnOk: () => {
  //       this.noiDungEmailSvc.deleteNoiDungEmail(id)
  //         .subscribe(res => !res ? this.alert.success(MessageConstant.vi.MSG_DEACTIVE_DONE) : null);
  //     }
  //   });
  // }
  closeModal(status: boolean): void {
    if (status) {
      this.onGetAllPaging();
      this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
    }
    this.modalRef.destroy();
  }

  getTenLoaiEmailById(id: string): string {
    if (!id) {
      return this.languageData[this.langCode].CONFIRM_TYPE_OF_EMAIL;
    } else {
      return this.listLoaiEmail.find(x => x.id === id) ? this.listLoaiEmail.find(x => x.id === id).title : '';
    }
  }
}
