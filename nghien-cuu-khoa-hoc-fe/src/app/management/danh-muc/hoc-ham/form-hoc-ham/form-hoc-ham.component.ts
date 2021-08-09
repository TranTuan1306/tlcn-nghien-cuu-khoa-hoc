import { MessageConstant } from './../../../../core/constants/message.constant';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { HocHam } from 'src/app/core/models/management/danh-muc/hoc-ham.model';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { HocHamService } from 'src/app/core/services/management/danh-muc/hoc-ham.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-hoc-ham',
  templateUrl: './form-hoc-ham.component.html',
  styleUrls: ['./form-hoc-ham.component.scss']
})
export class FormHocHamComponent implements OnInit {

  @Input() modalData: ModalData<HocHam>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private hocHamSvc: HocHamService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tenHocHam: this.modalData.data.tenHocHam,
        tenHocHamEn: this.modalData.data.tenHocHamEn,
        tenVietTat: this.modalData.data.tenVietTat,
        tenVietTatEn: this.modalData.data.tenVietTatEn,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      tenHocHam: ['', [Validators.required]],
      tenHocHamEn: ['', [Validators.required]],
      tenVietTat: ['', [Validators.required]],
      tenVietTatEn: ['', [Validators.required]],
    });
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.hocHamSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.hocHamSvc.create(this.form.value)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
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
