import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BaoCaoTienDoBM07 } from 'src/app/core/models/bieu-mau/bm07-bao-cao-tien-do.model';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { TienDoThucHienDeTaiService } from 'src/app/core/services/management/de-tai/tien-do-thuc-hien-de-tai.service';
import { Paginate } from '../../widget/paginate/paginate.model';

@Component({
  selector: 'app-tien-do-thuc-hien',
  templateUrl: './tien-do-thuc-hien.component.html',
  styleUrls: ['./tien-do-thuc-hien.component.scss']
})
export class TienDoThucHienComponent implements OnInit {

  @Input() modalDataBaoCao: ModalData<BaoCaoTienDoBM07>;
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
  modalData: ModalData<BaoCaoTienDoBM07> = new ModalData<BaoCaoTienDoBM07>();

  // table
  listBaoCaoTienDo: Paginate<BaoCaoTienDoBM07> = new Paginate<BaoCaoTienDoBM07>();
  searchValue = '';
  tableLoading = true;


  constructor(
    private modalService: NzModalService,
    private baoCaoTienDoSvc: TienDoThucHienDeTaiService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PROGRESS_REPORT;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].PROGRESS_REPORT,
        link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN
      }
    ];

    this.getAllDataPaging();
  }

  getAllDataPaging() {
    this.tableLoading = true;
    //  this.listBaoCaoTienDo.data = [{ id: '1',  }];
    this.listBaoCaoTienDo.totalItem = 1;
    this.listBaoCaoTienDo.totalPage = 1;
    this.listBaoCaoTienDo.limit = 5;
    this.tableLoading = false;
    /*this.listBaoCaoTienDo.findAllPaging(
      this.listBaoCaoTienDo.currentPage - 1,
      this.listBaoCaoTienDo.limit,
      this.searchValue)
      .subscribe(res => {
        this.listBaoCaoTienDo.data = res.content;
        this.listBaoCaoTienDo.totalItem = res.totalElements;
        this.listBaoCaoTienDo.totalPage = res.totalPages;
        this.listBaoCaoTienDo.limit = res.pageable.pageSize;
        this.tableLoading = false;
      });*/
  }

  onSearch() {
    this.listBaoCaoTienDo.currentPage = 1;
    this.getAllDataPaging();
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: BaoCaoTienDoBM07, modalWidth?: number) {
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
        this.baoCaoTienDoSvc.deleteBaoCao(id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_DELETED_DONE);
          });
      }
    });
  }

  pageChanged(page: Paginate<BaoCaoTienDoBM07>) {
    this.listBaoCaoTienDo = page;
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
