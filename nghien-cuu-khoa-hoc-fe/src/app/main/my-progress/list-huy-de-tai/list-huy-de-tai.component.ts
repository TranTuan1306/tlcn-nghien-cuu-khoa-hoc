import { DeTai } from './../../../core/models/management/de-tai/de-tai.model';
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
import { BieuMauService } from 'src/app/core/services/management/bieu-mau/bieu-mau.service';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { TienDoThucHienDeTaiService } from 'src/app/core/services/management/de-tai/tien-do-thuc-hien-de-tai.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { DonXinHuy } from 'src/app/core/models/management/de-tai/don-xin-huy.model';

@Component({
  selector: 'app-list-huy-de-tai',
  templateUrl: './list-huy-de-tai.component.html',
  styleUrls: ['./list-huy-de-tai.component.scss', '../../../../assets/theme/css/main.css', '../../../../assets/theme/css/main.css']
})
export class ListHuyDeTaiComponent implements OnInit {

  @Input() modalDataBaoCao: ModalData<BaoCaoTienDoBM07>;
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
  modalDataDeTai: ModalData<DeTai> = new ModalData<DeTai>();
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
    private spinner: NgxSpinnerService,
    private bieuMauSvc: BieuMauService,
  ) {
    // console.log('iddd', this.activatedRouterSvc.snapshot.params.id);
  }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PROGRESS_REPORT;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].PROGRESS_REPORT,
        link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN
      }
    ];
    this.getDeTaiById();
    this.modalDataId.data = this.activatedRouterSvc.snapshot.params.id;
  }

  getDeTaiById() {
    this.deTaiSvc.getDeTaiById(this.activatedRouterSvc.snapshot.params.id)
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

  modalCreate(template: TemplateRef<unknown>, modalWidth?: number) {
    this.spinner.show();
    this.modalData.action = SystemConstant.ACTION.ADD;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  modalEdit(template: TemplateRef<unknown>, data: DonXinHuy, modalWidth?: number) {
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
        : this.languageData[this.langCode].EDITING) + this.languageData[this.langCode].PROPOSAL_TO_CANCEL_TOPICS,
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  closeModal(status: boolean): void {
    if (status) {
      this.getDeTaiById();
    }
    this.modalRef.destroy();
  }

  downloadBieuMauBaoCaoTinhHinhThucHien() {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauBaoCaoTinhHinhthucHienDeTai(this.activatedRouterSvc.snapshot.params.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM07T-bieu-mau-bao-cao-tinh-hinh-thuc-hien-de-tai(${this.maSoDeTai}).docx`
            : `BM07T-report-on-the-status-of-project-implementation(${this.maSoDeTai}).docx`);
        this.spinner.hide();
      }, ()=> this.spinner.hide());
  }

  convertFileFromBlob(data: Blob, fileName: string) {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
