import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { DeTaiService } from 'src/app/core/services/user/de-tai.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-review-the-topic',
  templateUrl: './review-the-topic.component.html',
  styleUrls: ['./review-the-topic.component.scss']
})
export class ReviewTheTopicComponent implements OnInit {
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<DeTai> = new ModalData<DeTai>();

  // table
  loadingTable = true;

  // chọn đề tài
  checked = false;
  indeterminate = false;
  listOfCurrentPageDeTai: [] = []; //model là đề tài đã được ký hợp đồng
  setOfCheckedId = new Set<string>();

  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();

  searchValue = '';
  isShow = false;

  constructor(
    private modalService: NzModalService,
    private alert: ToastrService,
    private deTaiSvc: DeTaiService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PERFORMING_PROGRESS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].TOPICS,
        link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN
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
    this.deTaiSvc.getAllDeTaiPaging('',
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit,
      this.searchValue)
      .subscribe(res => {
        this.listDeTai.data = res.content;
        this.listDeTai.totalItem = res.totalElements;
        this.listDeTai.totalPage = res.totalPages;
        this.listDeTai.limit = res.pageable.pageSize;
        this.loadingTable = false;
      }, () => {
        this.listDeTai.data = [];
        this.loadingTable = false;
      });
  }


  modalView(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.VIEW;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: DeTai, modalWidth?: number) {
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

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  // choose de tai
  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageDeTai;
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  toggleShow() {
    this.isShow = !this.isShow;
  }
}
