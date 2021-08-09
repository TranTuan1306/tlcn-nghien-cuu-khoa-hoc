import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LoaiKinhPhi } from 'src/app/core/models/management/danh-muc/kinh-phi.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { LoaiKinhPhiService } from 'src/app/core/services/management/danh-muc/loai-kinh-phi.service';
// import { LoaiKinhPhiService } from 'src/app/core/services/management/danh-muc/loai-kinh-phi.service';

@Component({
  selector: 'app-form-loai-kinh-phi',
  templateUrl: './form-loai-kinh-phi.component.html',
  styleUrls: ['./form-loai-kinh-phi.component.scss']
})
export class FormLoaiKinhPhiComponent implements OnInit {

  @Input() modalData: ModalData<LoaiKinhPhi>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;
  listFieldNames = SystemConstant.LIST_FIELD_NAME[this.langCode];
  defaultFieldNames = {
    en: 'Payment content, National expense, Others expense, Notes',
    vi: 'Nội dung chi, Ngân sách nhà nước, Nguồn kinh phí khác, Ghi chú'
  };

  constructor(
    private fb: FormBuilder,
    private alert: ToastrService,
    private loaiKinhPhiSvc: LoaiKinhPhiService,
    private validatorSvc: ValidatorService,
  ) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tenLoaiKinhPhi: this.modalData.data.tenLoaiKinhPhi,
        tenLoaiKinhPhiEn: this.modalData.data.tenLoaiKinhPhiEn,
        fieldNames: this.modalData.data.fieldNames,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      tenLoaiKinhPhi: ['', [Validators.required]],
      tenLoaiKinhPhiEn: ['', [Validators.required]],
      fieldNames: [null],
    });
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    this.form.get('fieldNames').setValue(this.listFieldNames.filter(x => x.checked).map(x => x.value));
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.loaiKinhPhiSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.loaiKinhPhiSvc.create(this.form.value)
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
