import { ToastrService } from 'ngx-toastr';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { NoiDungBM07 } from 'src/app/core/models/management/de-tai/bao-cao-tien-do.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { MessageConstant } from 'src/app/core/constants/message.constant';

@Component({
  selector: 'app-form-noi-dung-nghien-cuu',
  templateUrl: './form-noi-dung-nghien-cuu.component.html',
  styleUrls: ['./form-noi-dung-nghien-cuu.component.scss']
})
export class FormNoiDungNghienCuuComponent implements OnInit {
  @Input() modalDataBM07: ModalData<NoiDungBM07>;
  @Output() modalDataBM07Return: EventEmitter<NoiDungBM07> = new EventEmitter();
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

  createForm() {
    this.form = this.fbd.group({
      id: [Math.floor(Math.random() * 10000000), [Validators.required]],
      noiDungNghienCuuDaThucHien: ['', [Validators.required]],
      noiDungNghienCuuTheoThuyetMinh: ['', [Validators.required]],
      tuDanhGia: ['', [Validators.required]],
    });
    if (this.modalDataBM07.action === SystemConstant.ACTION.EDIT) {
      this.patchValue();
    }
  }

  patchValue() {
    this.form.patchValue({
      id: this.modalDataBM07.data.id,
      noiDungNghienCuuDaThucHien: this.modalDataBM07.data.noiDungNghienCuuDaThucHien,
      noiDungNghienCuuTheoThuyetMinh: this.modalDataBM07.data.noiDungNghienCuuTheoThuyetMinh,
      tuDanhGia: this.modalDataBM07.data.tuDanhGia,
    });
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

  onSubmit() {
    if (this.form.valid) {
      if (this.modalDataBM07.action === SystemConstant.ACTION.ADD) {
        this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
        this.modalDataBM07Return.emit(this.form.value);
        this.returnData.emit(true);
      } else {
        this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
        this.modalDataBM07Return.emit(this.form.value);
        this.returnData.emit(true);
      }
    } else {
      this.validatorSvc.validateAllFormFields(this.form);
    }
  }

  onCancel() {

  }

}
