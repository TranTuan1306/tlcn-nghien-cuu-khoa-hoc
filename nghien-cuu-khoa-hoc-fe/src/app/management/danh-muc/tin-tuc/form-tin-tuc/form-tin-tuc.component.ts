import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { TinTuc } from 'src/app/core/models/management/danh-muc/tin-tuc.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { TinTucService } from 'src/app/core/services/management/danh-muc/tin-tuc.service';

@Component({
  selector: 'app-form-tin-tuc',
  templateUrl: './form-tin-tuc.component.html',
  styleUrls: ['./form-tin-tuc.component.scss']
})
export class FormTinTucComponent implements OnInit {

  @Input() modalData: ModalData<TinTuc>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;
  classicCkEditor = SystemConstant.configEditor5;

  loaiTinTuc = SystemConstant.LOAI_TIN_TUC_TITLE[this.langCode];

  constructor(private fb: FormBuilder,
    private tinTucSvc: TinTucService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        loaiTinTuc: this.modalData.data.loaiTinTuc,
        hinhAnh: this.modalData.data.hinhAnh,
        tieuDe: this.modalData.data.tieuDe,
        tieuDeEn: this.modalData.data.tieuDeEn,
        noiDung: this.modalData.data.noiDung,
        noiDungEn: this.modalData.data.noiDungEn,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      loaiTinTuc: ['', [Validators.required]],
      hinhAnh: [[]],
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
        this.tinTucSvc.updateTinTuc(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.tinTucSvc.createTinTuc(this.form.value)
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
