import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { CauHinhEmail } from 'src/app/core/models/management/cau-hinh/cau-hinh-email.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { CauHinhEmailService } from 'src/app/core/services/management/cau-hinh/cau-hinh-email.service';
import { customEmailValidator } from 'src/app/core/validators/email.validator';

@Component({
  selector: 'app-form-cau-hinh-email',
  templateUrl: './form-cau-hinh-email.component.html',
  styleUrls: ['./form-cau-hinh-email.component.scss']
})
export class FormCauHinhEmailComponent implements OnInit {

  @Input() modalData: ModalData<CauHinhEmail>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup;
  showPass = false;


  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  constructor(private fb: FormBuilder,
    private cauHinhEmailSvc: CauHinhEmailService,
    private validSvc: ValidatorService) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        emailGuiThu: this.modalData.data.emailGuiThu,
        emailNhanThu: this.modalData.data.emailNhanThu,
        passEmailGuiThu: this.modalData.data.passEmailGuiThu,
        // confirmPassEmailGuiThu: this.modalData.data.confirmPassEmailGuiThu,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      emailGuiThu: ['', [Validators.required, customEmailValidator]],
      emailNhanThu: ['', [Validators.required, customEmailValidator]],
      passEmailGuiThu: [],
      // confirmPassEmailGuiThu: [],
    });
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      this.cauHinhEmailSvc.createCauHinhEmail(this.form.value)
        .subscribe(() => {
        });
    } else {
      this.validSvc.validateAllFormFields(this.form);
    }
  }

  toggleShowPass(): void {
    this.showPass = !this.showPass;
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
