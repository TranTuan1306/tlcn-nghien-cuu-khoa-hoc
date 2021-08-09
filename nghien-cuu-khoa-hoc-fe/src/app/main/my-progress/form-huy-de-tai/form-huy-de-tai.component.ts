import { DonXinHuy } from './../../../core/models/management/de-tai/don-xin-huy.model';
import { MessageConstant } from './../../../core/constants/message.constant';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { NoiDungBM07, SanPhamBM07s } from 'src/app/core/models/management/de-tai/bao-cao-tien-do.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { BieuMauService } from 'src/app/core/services/management/bieu-mau/bieu-mau.service';

@Component({
  selector: 'app-form-huy-de-tai',
  templateUrl: './form-huy-de-tai.component.html',
  styleUrls: ['./form-huy-de-tai.component.scss']
})
export class FormHuyDeTaiComponent implements OnInit {

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

  listSanPhamNghienCuu: SanPhamBM07s[] = [];
  listSanPhamNghienCuuTemp: SanPhamBM07s[] = [];
  listNoiDungNghienCuu: NoiDungBM07[] = [];
  tableLoading = false;
  modalDefaultWidth = 400;
  listDeTai: DeTai;

  showForm = false;

  constructor(
    private fbd: FormBuilder,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private activatedRouterSvc: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private bieuMauSvc: BieuMauService
  ) {
    if (this.activatedRouterSvc.snapshot.params.id) {}
  }

  ngOnInit() {
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
        lyDo: ['', [Validators.required]],
        soTienDaTamUng: ['', [Validators.required]],
        thoiGianTamUng: ['', [Validators.required]]
      });
      this.showForm = true;
      this.spinner.hide();
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.patchValue();
      }
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

  onSubmit() {
    this.form.get('soTienDaTamUng').setValue(this.form.get('soTienDaTamUng').value.replace(/\./g, ''));
    if (this.form.valid) {
      this.spinner.show();
      this.bieuMauSvc.xuatBieuMauDonXinHuyDeTai(
        this.modalDataDeTai.data.id,
        this.form.get('lyDo').value,
        this.form.get('soTienDaTamUng').value,
        this.form.get('thoiGianTamUng').value,
      ).subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM09T-bieu-mau-don-xin-huy-de-tai(${this.modalDataDeTai.data.maSo}).docx`
            : `BM09T-application-cancel-the-topic(${this.modalDataDeTai.data.maSo}).docx`);
        this.spinner.hide();
        this.returnData.emit(true);
        this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
      }, () => this.spinner.show());
    } else {
      this.alert.success(MessageConstant[this.langCode].MSG_FIELD_EMPTY);
      this.validatorSvc.validateAllFormFields(this.form);
    }
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
