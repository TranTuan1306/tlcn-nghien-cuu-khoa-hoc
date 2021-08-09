import { ToastrService } from 'ngx-toastr';
import { SanPhamBM07s } from './../../../core/models/management/de-tai/bao-cao-tien-do.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { MessageConstant } from 'src/app/core/constants/message.constant';

@Component({
  selector: 'app-form-san-pham',
  templateUrl: './form-san-pham.component.html',
  styleUrls: ['./form-san-pham.component.scss']
})
export class FormSanPhamComponent implements OnInit {
  @Input() modalDataSanPhamBM07: ModalData<SanPhamBM07s>;
  @Output() modalDataSanPhamBM07Return: EventEmitter<SanPhamBM07s> = new EventEmitter();
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  form: FormGroup;
  constructor(
    private fbd: FormBuilder,
    private validatorSvc: ValidatorService,
    private alert: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  patchValue() {
    this.form.patchValue({
      // id: this.modalDataSanPhamBM07.data.id,
      // sanPham: this.modalDataSanPhamBM07.data.sanPham,
      // sanPhamTheoThuyetMinh: typeof this.modalDataSanPhamBM07.data.sanPham === 'string' ? this.modalDataSanPhamBM07.data.sanPham
      //   : (this.langCode === 'vi' ? this.modalDataSanPhamBM07.data.sanPham.tenSanPham
      //     : this.modalDataSanPhamBM07.data.sanPham.tenSanPhamEn),
      // sanPhamDaDatDuoc: this.modalDataSanPhamBM07.data.sanPhamDaDatDuoc,
      // tuDanhGia: this.modalDataSanPhamBM07.data.tuDanhGia
    });
  }

  createForm() {
    this.form = this.fbd.group({
      // I. Thông tin chung
      id: ['', [Validators.required]],
      sanPham: [null, [Validators.required]],
      sanPhamTheoThuyetMinh: ['', [Validators.required]],
      sanPhamDaDatDuoc: ['', [Validators.required]],
      tuDanhGia: ['', [Validators.required]]
    });
    this.patchValue();
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

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
      this.modalDataSanPhamBM07Return.emit(this.form.value);
      this.returnData.emit(true);
    } else {
      this.validatorSvc.validateAllFormFields(this.form);
    }
  }

}
