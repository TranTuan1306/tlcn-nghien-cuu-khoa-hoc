import { MessageConstant } from './../../../../core/constants/message.constant';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { HocVi } from 'src/app/core/models/management/danh-muc/hoc-vi.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HocViService } from 'src/app/core/services/management/danh-muc/hoc-vi.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-hoc-vi',
  templateUrl: './form-hoc-vi.component.html',
  styleUrls: ['./form-hoc-vi.component.scss']
})
export class FormHocViComponent implements OnInit {

  @Input() modalData: ModalData<HocVi>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private hocViSvc: HocViService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tenHocVi: this.modalData.data.tenHocVi,
        tenHocViEn: this.modalData.data.tenHocViEn,
        tenVietTat: this.modalData.data.tenVietTat,
        tenVietTatEn: this.modalData.data.tenVietTatEn,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      tenHocVi: ['', [Validators.required]],
      tenHocViEn: ['', [Validators.required]],
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
        this.hocViSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.hocViSvc.create(this.form.value)
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
