import { ToastrService } from 'ngx-toastr';
import { HoiDongNghiemThuService } from './../../../../core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { HoiDongNghiemThu } from './../../../../core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { ValidatorService } from 'src/app/core/services/common/validator.service';

@Component({
  selector: 'app-form-edit-hoi-dong-nghiem-thu',
  templateUrl: './form-edit-hoi-dong-nghiem-thu.component.html',
  styleUrls: ['./form-edit-hoi-dong-nghiem-thu.component.scss']
})
export class FormEditHoiDongNghiemThuComponent implements OnInit {
  @Input() modalDataEdit: ModalData<HoiDongNghiemThu>;
  @Input() currentTab: number;
  @Output() returnData: EventEmitter<{
    check: boolean;
    currentTab: number;
  }> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant= MessageTooltipConstant;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService,
    private alert: ToastrService,
    private validatorSvc: ValidatorService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      diaDiem: [null, [Validators.required]],
      khachMoi: [null, [Validators.required]],
      ngayHop: [null, [Validators.required]],
      ngayQuyetDinh: [null, [Validators.required]],
      soQuyetDinh: [null, [Validators.required]],
      tenHoiDong: [null, [Validators.required]]
    });
    if (this.modalDataEdit.data.soQuyetDinh) {
      this.patchValue();
    }
  }

  patchValue() {
    this.form.patchValue({
      diaDiem: this.modalDataEdit.data.diaDiem,
      khachMoi: this.modalDataEdit.data.khachMoi,
      ngayHop: this.modalDataEdit.data.ngayHop,
      ngayQuyetDinh: this.modalDataEdit.data.ngayQuyetDinh,
      soQuyetDinh: this.modalDataEdit.data.soQuyetDinh,
      tenHoiDong: this.modalDataEdit.data.tenHoiDong
    });
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

  onSubmit() {
    if (this.form.valid) {
      this.hoiDongNghiemThuSvc.capNhatHoiDongNghiemThu(this.form.value, this.modalDataEdit.data.id)
        .subscribe(() => {
          this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          this.returnData.emit({
            check: true,
            currentTab: this.currentTab
          });
        });
    } else {
      this.validatorSvc.validateAllFormFields(this.form);
    }
  }

  onCancel() {}

}
