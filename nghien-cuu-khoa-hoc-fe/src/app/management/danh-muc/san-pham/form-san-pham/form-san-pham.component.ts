import { MessageConstant } from './../../../../core/constants/message.constant';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { SanPham } from 'src/app/core/models/management/danh-muc/san-pham.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { SanPhamService } from 'src/app/core/services/management/danh-muc/san-pham.service';

@Component({
  selector: 'app-form-san-pham',
  templateUrl: './form-san-pham.component.html',
  styleUrls: ['./form-san-pham.component.scss']
})
export class FormSanPhamComponent implements OnInit {

  @Input() modalData: ModalData<SanPham>;
  @Input() totalElements: number;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;

  loaiSanPhams = SystemConstant.LOAI_SAN_PHAM_TITLE[this.langCode];
  constructor(private fbd: FormBuilder,
    private sanPhamSvc: SanPhamService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fbd.group({
      loaiSanPham: [SystemConstant.LOAI_SAN_PHAM.DAO_TAO, [Validators.required]],
      tenSanPham: ['', [Validators.required]],
      tenSanPhamEn: ['', [Validators.required]],
      soThuTu: [this.totalElements, [Validators.required]],
    });

    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        loaiSanPham: this.modalData.data.loaiSanPham,
        tenSanPham: this.modalData.data.tenSanPham,
        tenSanPhamEn: this.modalData.data.tenSanPhamEn,
        soThuTu: this.modalData.data.soThuTu
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.sanPhamSvc.updateSanPham(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(false);
            this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          },
          () => {
            this.alert.error(MessageConstant[this.langCode].MSG_ERR_SYSTEM);
          });
      } else {
        this.sanPhamSvc.createSanPham(this.form.value)
          .subscribe(() => {
            this.returnData.emit(false);
            this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
          },
          () => {
            this.alert.error(MessageConstant[this.langCode].MSG_ERR_SYSTEM);
          });
      }
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

  parseToNumer(value: string): string {
    if (value) {
      if (typeof value === 'string') {
        return isNaN(+value) ? '1' : value;
      } else if (typeof value === 'number') {
        return value;
      }
    } else {
      return '1';
    }
  }
}

