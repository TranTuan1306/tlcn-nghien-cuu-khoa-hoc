import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChuyenMucBaiViet } from 'src/app/core/models/management/danh-muc/chuyen-muc-bai-viet.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { ChuyenMucBaiVietService } from 'src/app/core/services/management/danh-muc/chuyen-muc-bai-viet.service';

@Component({
  selector: 'app-form-chuyen-muc-bai-viet',
  templateUrl: './form-chuyen-muc-bai-viet.component.html',
  styleUrls: ['./form-chuyen-muc-bai-viet.component.scss']
})
export class FormChuyenMucBaiVietComponent implements OnInit {

  @Input() modalData: ModalData<ChuyenMucBaiViet>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private chuyenMucBaiVietSvc: ChuyenMucBaiVietService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        maChuyenMuc: this.modalData.data.maChuyenMuc,
        tenChuyenMuc: this.modalData.data.tenChuyenMuc,
        tenChuyenMucEn: this.modalData.data.tenChuyenMucEn,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      maChuyenMuc: ['', [Validators.required]],
      tenChuyenMuc: ['', [Validators.required]],
      tenChuyenMucEn: ['', [Validators.required]],
    });
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.chuyenMucBaiVietSvc.updateChuyenMuc(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.chuyenMucBaiVietSvc.createChuyenMuc(this.form.value)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_CREATED_DONE);
          });
      }
    } else {
      this.validatorSvc.validateAllFormFields(this.form);
    }
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
}
