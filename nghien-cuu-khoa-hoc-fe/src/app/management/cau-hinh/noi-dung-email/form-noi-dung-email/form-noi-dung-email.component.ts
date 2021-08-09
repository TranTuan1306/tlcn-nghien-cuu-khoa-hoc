import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { NoiDungEmail } from 'src/app/core/models/management/cau-hinh/noi-dung-email.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { NoiDungEmailService } from 'src/app/core/services/management/cau-hinh/noi-dung-email.service';

@Component({
  selector: 'app-form-noi-dung-email',
  templateUrl: './form-noi-dung-email.component.html',
  styleUrls: ['./form-noi-dung-email.component.scss']
})
export class FormNoiDungEmailComponent implements OnInit {

  @Input() modalData: ModalData<NoiDungEmail>;
  @Output() closePopup: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;
  classicCkEditor = SystemConstant.configEditor5;

  loaiEmail = SystemConstant.LOAI_EMAIL_TITLE[this.langCode];

  constructor(
    private fbd: FormBuilder,
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private validatorSvc: ValidatorService,
    private noiDungEmailSvc: NoiDungEmailService,
  ) {
    //
  }

  ngOnInit(): void {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.patchValue();
    }
  }

  createForm(): void {
    this.form = this.fbd.group({
      loai: [null, [Validators.required]],
      tieuDe: [null, [Validators.required]],
      noiDung: [null, [Validators.required]],
    });
  }

  patchValue(): void {
    this.form.patchValue({
      loai: this.modalData.data.loai,
      tieuDe: this.modalData.data.tieuDe,
      noiDung: this.modalData.data.noiDung,
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.spinner.show();
      if (this.modalData.action === SystemConstant.ACTION.ADD) {
        this.noiDungEmailSvc.createNoiDungEmail(this.form.value)
          .subscribe(() => {
            this.alert.success(this.languageData[this.langCode].MSG_CREATED_DONE);
            this.closePopup.emit(false);
            this.spinner.hide();
          },
          () => this.spinner.hide());
      } else { // edit
        this.noiDungEmailSvc.updateNoiDungEmail(this.modalData.data.id, this.form.value)
          .subscribe(() => {
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
            this.closePopup.emit(false);
            this.spinner.hide();
          },
          () => this.spinner.hide());
      }
    } else {
      this.validatorSvc.validateAllFormFields(this.form);
    }
  }

  onCancel(): void {
    this.closePopup.emit(null);
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
