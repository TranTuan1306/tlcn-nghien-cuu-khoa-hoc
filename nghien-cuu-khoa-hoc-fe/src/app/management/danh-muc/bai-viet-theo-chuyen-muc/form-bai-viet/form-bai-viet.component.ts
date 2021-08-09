import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { BaiVietTheoChuyenMuc } from 'src/app/core/models/management/danh-muc/bai-viet-theo-chuyen-muc.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { BaiVietTheoChuyenMucService } from 'src/app/core/services/management/danh-muc/bai-viet-theo-chuyen-muc.service';

@Component({
  selector: 'app-form-bai-viet',
  templateUrl: './form-bai-viet.component.html',
  styleUrls: ['./form-bai-viet.component.scss']
})
export class FormBaiVietComponent implements OnInit {

  @Input() modalData: ModalData<BaiVietTheoChuyenMuc>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;
  classicCkEditor = SystemConstant.configEditor5;

  constructor(private fb: FormBuilder,
    private baiVietSvc: BaiVietTheoChuyenMucService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tieuDe: this.modalData.data.tieuDe,
        tieuDeEn: this.modalData.data.tieuDeEn,
        noiDung: this.modalData.data.noiDung,
        noiDungEn: this.modalData.data.noiDungEn,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      tieuDe: ['', [Validators.required]],
      tieuDeEn: ['', [Validators.required]],
      noiDung: ['', [Validators.required]],
      noiDungEn: ['', [Validators.required]],
    });
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.baiVietSvc.updateBaiViet(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.baiVietSvc.createBaiViet(this.form.value)
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
    return (!this.form.get(field).valid && this.form.get(field).touched
    );
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
}
