import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { DonViPhoiHopChinh } from 'src/app/core/models/bieu-mau/bm02-thuyet-minh-de-tai.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';

@Component({
  selector: 'app-form02bs-don-vi-phoi-hop',
  templateUrl: './form02bs-don-vi-phoi-hop.component.html',
  styleUrls: ['./form02bs-don-vi-phoi-hop.component.scss']
})
export class Form02bsDonViPhoiHopComponent implements OnInit {

  @Input() modalData: ModalData<DonViPhoiHopChinh>;
  @Output() returnData: EventEmitter<DonViPhoiHopChinh> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
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
        tenDonVi: this.modalData.data.tenDonVi,
        hoTenNguoiDaiDien: this.modalData.data.hoTenNguoiDaiDien,
        noiDungPhoiHop: this.modalData.data.noiDungPhoiHop,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      id: [Math.floor(Math.random() * 10000000)],
      tenDonVi: ['', [Validators.required]],
      hoTenNguoiDaiDien: ['', [Validators.required]],
      noiDungPhoiHop: ['', [Validators.required]],
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
