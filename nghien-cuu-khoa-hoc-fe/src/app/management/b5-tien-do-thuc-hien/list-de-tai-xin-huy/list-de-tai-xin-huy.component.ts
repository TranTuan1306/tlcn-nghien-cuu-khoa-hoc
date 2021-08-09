import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BaoCaoTienDoBM07 } from 'src/app/core/models/bieu-mau/bm07-bao-cao-tien-do.model';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { DonXinHuy } from 'src/app/core/models/management/de-tai/don-xin-huy.model';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { TienDoThucHienDeTaiService } from 'src/app/core/services/management/de-tai/tien-do-thuc-hien-de-tai.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-de-tai-xin-huy',
  templateUrl: './list-de-tai-xin-huy.component.html',
  styleUrls: ['./list-de-tai-xin-huy.component.scss']
})
export class ListDeTaiXinHuyComponent implements OnInit {
  @Input() modalDataDeTai: ModalData<DeTai>;
  @Input() modalDataBaoCao: ModalData<BaoCaoTienDoBM07>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////
  messageTooltipConstant = MessageTooltipConstant;
  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  checkAdmin = true;
  showViewAndApprove = false;
  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<DonXinHuy> = new ModalData<DonXinHuy>();
  modalDataId: ModalData<string> = new ModalData<string>();

  // table
  listDonXinHuy: Paginate<DonXinHuy> = new Paginate<DonXinHuy>();
  searchValue = '';
  tableLoading = true;
  maSoDeTai= '';

  constructor(
    private modalService: NzModalService,
    private baoCaoTienDoSvc: TienDoThucHienDeTaiService,
    private activatedRouterSvc: ActivatedRoute,
    private alert: ToastrService,
    private deTaiSvc: DeTaiAdminService,
    private spinner: NgxSpinnerService
  ) {
    if (this.activatedRouterSvc.snapshot.params.id) {}
  }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PROGRESS_REPORT;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].PROGRESS_REPORT,
        link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN
      }
    ];
    this.checkShowViewAndApprove();
    this.getDeTaiById();
    this.modalDataId.data = this.modalDataDeTai.data.id;
  }

  checkShowViewAndApprove() {
    if (this.modalDataDeTai.data.trangThaiDeTai === 'XIN_HUY') {
      this.showViewAndApprove = true;
    } else {
      this.showViewAndApprove = false;
    }
  }

  getDeTaiById() {
    this.deTaiSvc.getDeTaiById(this.modalDataDeTai.data.id)
      .subscribe(res=>{
        this.maSoDeTai = res.maSo;
        this.listDonXinHuy.data = res.donXinHuys.reverse();
        this.modalDataDeTai.data = res;
      });
  }

  handleISOStringToDayMonthYear(isoString: string) {
    const s = new Date(isoString).toLocaleString('vi');
    // return isoString.match(/([^T]+)/)[0].split('-').reverse().join('/');
    return s;
  }

  handleCurrency(currency: number) {
    return currency.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
  }

  modalViewAndApprove(template: TemplateRef<unknown>, data: DonXinHuy, modalWidth?: number) {
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
      nzTitle: this.languageData[this.langCode].APPROVAL + ' ' + this.languageData[this.langCode].CANCEL_TOPIC,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  closeModal(status: boolean): void {
    if (status) {
      // this.getDeTaiById();
      this.returnData.emit(true);
    }
    this.modalRef.destroy();
  }
}
