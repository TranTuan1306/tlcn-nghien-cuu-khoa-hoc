import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { BaoCaoTienDo } from 'src/app/core/models/management/de-tai/bao-cao-tien-do.model';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { TienDoThucHienDeTaiService } from 'src/app/core/services/management/de-tai/tien-do-thuc-hien-de-tai.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-bao-cao-tien-do',
  templateUrl: './list-bao-cao-tien-do.component.html',
  styleUrls: ['./list-bao-cao-tien-do.component.scss']
})
export class ListBaoCaoTienDoComponent implements OnInit {
  @Input() modalDataBaoCao: ModalData<string>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant;
  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<BaoCaoTienDo> = new ModalData<BaoCaoTienDo>();
  modalDataId: ModalData<string> = new ModalData<string>();

  // table
  listBaoCaoTienDo: Paginate<BaoCaoTienDo> = new Paginate<BaoCaoTienDo>();
  searchValue = '';
  tableLoading = true;

  constructor(
    private modalService: NzModalService,
    private baoCaoTienDoSvc: TienDoThucHienDeTaiService,
    private alert: ToastrService,
    private deTaiSvc: DeTaiAdminService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PROGRESS_REPORT;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].PROGRESS_REPORT,
        link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN
      }
    ];
    this.getDeTaiById();
    this.modalDataId.data = this.modalDataBaoCao.data;
  }

  getDeTaiById() {
    this.deTaiSvc.getDeTaiById(this.modalDataBaoCao.data)
      .subscribe(res=>{
        this.listBaoCaoTienDo.data = res.baoCaoTienDos.reverse();
      });
  }

  handleISOStringToDayMonthYear(isoString: string) {
    const s = new Date(isoString).toLocaleString('vi');
    // return isoString.match(/([^T]+)/)[0].split('-').reverse().join('/');
    return s;
  }

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.spinner.show();
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: BaoCaoTienDo, modalWidth?: number) {
    this.spinner.show();
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
      this.getDeTaiById();
    }
    this.modalRef.destroy();
  }

}
