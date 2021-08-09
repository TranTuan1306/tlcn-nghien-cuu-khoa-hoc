import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';

@Component({
  selector: 'app-form-additional-explanation',
  templateUrl: './form-additional-explanation.component.html',
  styleUrls: ['./form-additional-explanation.component.scss']
})
export class FormAdditionalExplanationComponent implements OnInit {
  @Input() deTaiModalData: ModalData<DeTai>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant;
  form: FormGroup;


  constructor(
    private fbd: FormBuilder,
    private validatorSvc: ValidatorService,
    private spinner: NgxSpinnerService,
    private deTaiSvc: DeTaiAdminService,
    private alert: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fbd.group({
      // I. Thông tin chung
      maSo: ['', [Validators.required]],
    });
    if (this.deTaiModalData.action === SystemConstant.ACTION.EDIT) {
      this.patchValue();
    }
  }

  patchValue() {
    this.form.patchValue({
      maSo: this.deTaiModalData.data.maSo
    });
    this.spinner.hide();
  }

  onSubmit() {
    this.spinner.show();
    if (this.form.valid) {
      this.deTaiSvc.addMaSoDeTai(this.deTaiModalData.data.id, this.form.get('maSo').value)
        .subscribe(() => {
          this.spinner.hide();
          if (this.deTaiModalData.action === SystemConstant.ACTION.ADD) {
            this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
          } else {
            this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          }
          this.returnData.emit(true);
        }, () => this.spinner.hide());
    } else {
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

}
