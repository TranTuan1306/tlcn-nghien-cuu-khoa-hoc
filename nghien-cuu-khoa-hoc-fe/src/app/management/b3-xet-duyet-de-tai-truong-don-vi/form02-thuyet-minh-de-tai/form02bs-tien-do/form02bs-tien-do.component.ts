import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { TienDoThucHien } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';

@Component({
  selector: 'app-form02bs-tien-do-management',
  templateUrl: './form02bs-tien-do.component.html',
  styleUrls: ['./form02bs-tien-do.component.scss']
})
export class Form02bsTienDoManagementComponent implements OnInit {

  @Input() modalData: ModalData<TienDoThucHien>;
  @Output() returnData: EventEmitter<TienDoThucHien> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validSvc: ValidatorService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        id: this.modalData.data.id,
        noiDung: this.modalData.data.noiDung,
        sanPham: this.modalData.data.sanPham,
        thoiGian: this.modalData.data.thoiGian,
        nguoiThucHien: this.modalData.data.nguoiThucHien,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      id: [Math.floor(Math.random() * 10000000)],
      noiDung: ['', [Validators.required]],
      sanPham: ['', [Validators.required]],
      thoiGian: [1, [Validators.required]],
      nguoiThucHien: ['', [Validators.required]],
    });
  }

  onCancel() {
    this.returnData.emit(null);
  }

  onSubmit() {
    if (this.form.valid) {
      this.returnData.emit(this.form.value);
    } else {
      this.validSvc.validateAllFormFields(this.form);
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
