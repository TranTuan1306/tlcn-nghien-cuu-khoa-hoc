import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { NoiDungBM07, SanPhamBM07s } from 'src/app/core/models/management/de-tai/bao-cao-tien-do.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { DonXinHuy } from 'src/app/core/models/management/de-tai/don-xin-huy.model';
import { OAuth2Service } from 'src/app/core/services/auth/oauth2.service';

@Component({
  selector: 'app-form-huy-de-tai-share',
  templateUrl: './form-huy-de-tai-share.component.html',
  styleUrls: ['./form-huy-de-tai-share.component.scss']
})
export class FormHuyDeTaiShareComponent implements OnInit {
  @Input() checkAdmin: boolean;
  @Input() modalData: ModalData<DonXinHuy>;
  @Input() modalDataDeTai: ModalData<DeTai>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('focusInput') focusInput: ElementRef;
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant;

  editor = Editor;
  cfgEditor = SystemConstant.configEditor5;

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  listLoaiSanPham = SystemConstant.LOAI_SAN_PHAM_TITLE[this.langCode];

  form: FormGroup;
  modalRef: NzModalRef;

  modalDataBM07: ModalData<NoiDungBM07> = new ModalData<NoiDungBM07>();
  modalDataSanPhamBM07: ModalData<SanPhamBM07s> = new ModalData<SanPhamBM07s>();
  approveData = false;

  listSanPhamNghienCuu: SanPhamBM07s[] = [];
  listSanPhamNghienCuuTemp: SanPhamBM07s[] = [];
  listNoiDungNghienCuu: NoiDungBM07[] = [];
  tableLoading = false;
  modalDefaultWidth = 400;
  listDeTai: DeTai;

  showForm = false;

  //authen
  checkRole = false;

  constructor(
    private fbd: FormBuilder,
    // private validatorSvc: ValidatorService,
    // private alert: ToastrService,
    private activatedRouterSvc: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private modalService: NzModalService,
    private authService: OAuth2Service
  ) {
    if (this.activatedRouterSvc.snapshot.params.id) {}
  }

  ngOnInit() {
    if (this.authService.checkRole(SystemConstant.ROLE_USER.ROLE_ADMIN)) {
      this.checkRole = true;
    } else if (this.authService.checkRole(SystemConstant.ROLE_USER.ROLE_TRUONG_DON_VI)) {
      this.checkRole = false;
    }
    this.breadcrumbObj.heading = this.languageData[this.langCode].RESEARCH_CONTENTS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].PROGRESS_REPORT,
        link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN
      }
    ];
    this.createForm();
  }

  createForm() {
    setTimeout(() => {
      this.form = this.fbd.group({
        lyDo: [{ value: '', disabled: true }, [Validators.required]],
        soTienDaTamUng: ['', [Validators.required]],
        thoiGianTamUng: ['', [Validators.required]]
      });
      this.showForm = true;
      this.spinner.hide();
      this.patchValue();
    }, 100);
  }


  patchValue() {
    this.form.patchValue({
      lyDo: this.modalData.data.lyDo,
      soTienDaTamUng: this.modalData.data.soTienDaTamUng,
      thoiGianTamUng: this.modalData.data.thoiGianTamUng
    });
    this.spinner.hide();
  }

  onCancel() {
    this.returnData.emit(false);
  }

  isFieldValid(field: string) {
    return (
      !this.form.get(field).valid && this.form.get(field).touched
    );
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  approveCancelTopic(template: TemplateRef<unknown>, modalWidth?: number) {
    this.approveData = true;
    this.spinner.show();
    this.modalData.action = SystemConstant.ACTION.APPROVE;
    // this.modalData.data = data;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

  openModal(template: TemplateRef<unknown>, modalWidth: number): void {
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: (this.modalData.action === SystemConstant.ACTION.APPROVE ? this.languageData[this.langCode].APPROVE
        : this.languageData[this.langCode].REJECT) + ' ' + this.languageData[this.langCode].CANCEL_TOPIC.toLowerCase(),
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  closeModal(check: boolean) {
    if (check) {
      this.modalService.closeAll();
      this.returnData.emit(true);
    } else {
      this.modalRef.destroy();
    }
  }

  rejectCancelTopic(template: TemplateRef<unknown>, modalWidth?: number) {
    this.approveData = false;
    this.spinner.show();
    this.modalData.action = SystemConstant.ACTION.DELETE;
    // this.modalData.data = data;
    this.openModal(template, modalWidth ? modalWidth : this.modalDefaultWidth);
  }

}
