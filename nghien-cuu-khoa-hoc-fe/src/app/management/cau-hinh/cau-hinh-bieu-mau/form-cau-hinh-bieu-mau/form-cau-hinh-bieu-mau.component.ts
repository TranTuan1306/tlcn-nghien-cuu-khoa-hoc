import { CauHinhBieuMauService } from './../../../../core/services/management/cau-hinh/cau-hinh-bieu-mau.service';
import { CauHinhBieuMau } from './../../../../core/models/management/cau-hinh/cau-hinh-bieu-mau.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { ToastrService } from 'ngx-toastr';
import { DonVi } from 'src/app/core/models/management/danh-muc/don-vi.model';
import { DonViService } from 'src/app/core/services/management/don-vi.service';

@Component({
  selector: 'app-form-cau-hinh-bieu-mau',
  templateUrl: './form-cau-hinh-bieu-mau.component.html',
  styleUrls: ['./form-cau-hinh-bieu-mau.component.scss']
})
export class FormCauHinhBieuMauComponent implements OnInit {

  @Input() modalData: ModalData<CauHinhBieuMau>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup;
  showPass = false;
  listDonVi: DonVi[];


  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  constructor(
    private fb: FormBuilder,
    private validSvc: ValidatorService,
    private cauHinhBieuMauSvc: CauHinhBieuMauService,
    private alert: ToastrService,
    private donViSvc: DonViService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getAllDonVi();

  }

  getAllDonVi() {
    this.donViSvc.getAllDonVi()
      .subscribe(res => {
        this.listDonVi = res;
      });
  }

  createForm() {
    this.form = this.fb.group({
      chucVuBenA: ['', [Validators.required]],
      coQuanChuTri: ['', [Validators.required]],
      coQuanChuTriTemp: ['', [Validators.required]],
      tenBenA: ['', [Validators.required]],
      thongTinTaiKhoanBenA: ['', [Validators.required]],
      donVi: ['', [Validators.required]],
    });
    this.modalData.data.coQuanChuTriTemp = [];
    this.patchValue();
  }

  patchValue() {
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        chucVuBenA: this.modalData.data.chucVuBenA,
        coQuanChuTriTemp: this.modalData.data.coQuanChuTriTemp.join('\n'),
        coQuanChuTri: this.modalData.data.coQuanChuTri,
        tenBenA: this.modalData.data.tenBenA,
        thongTinTaiKhoanBenA: this.modalData.data.thongTinTaiKhoanBenA,
        donVi: this.modalData.data.donVi,
      });
    }
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    const listTask = this.form.get('coQuanChuTriTemp').value.split(/\n/g);
    if (this.form.valid) {
      if (this.modalData.action === 'add') {
        if (listTask.length === 1 && listTask[0] === '') {
          this.form.get('coQuanChuTri').setValue('');
          this.cauHinhBieuMauSvc.createCauHinhBieuMau(this.form.value)
            .subscribe(() => {
              this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
              this.returnData.emit(false);
            });
        } else {
          this.form.get('coQuanChuTri').setValue(listTask);
          this.cauHinhBieuMauSvc.createCauHinhBieuMau(this.form.value)
            .subscribe(() => {
              this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
              this.returnData.emit(false);
            });
        }

      } else {
        if (listTask.length === 1 && listTask[0] === '') {
          this.form.get('coQuanChuTri').setValue('');
          this.cauHinhBieuMauSvc.updateCauHinhBieuMau(this.modalData.data.id, this.form.value)
            .subscribe(() => {
              this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
              this.returnData.emit(false);
            });
        } else {
          this.form.get('coQuanChuTri').setValue(listTask);
          this.cauHinhBieuMauSvc.updateCauHinhBieuMau(this.modalData.data.id, this.form.value)
            .subscribe(() => {
              this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
              this.returnData.emit(false);
            });
        }
      }

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
