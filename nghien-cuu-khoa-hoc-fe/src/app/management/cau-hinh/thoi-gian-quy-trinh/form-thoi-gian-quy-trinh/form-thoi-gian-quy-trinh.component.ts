import { MessageConstant } from './../../../../core/constants/message.constant';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { ThoiGianQuyTrinhService } from 'src/app/core/services/management/cau-hinh/thoi-gian-quy-trinh.service';

@Component({
  selector: 'app-form-thoi-gian-quy-trinh',
  templateUrl: './form-thoi-gian-quy-trinh.component.html',
  styleUrls: ['./form-thoi-gian-quy-trinh.component.scss']
})
export class FormThoiGianQuyTrinhComponent implements OnInit {

  @Input() modalData: ModalData<ThoiGianQuyTrinh>;
  @Output() closePopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('genYear', { static: false }) genYear: TemplateRef<unknown>;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  inputYear = new Date().getFullYear();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private nzModalSvc: NzModalService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
  ) {
    this.createFormGroup();
  }

  ngOnInit() {
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.onSetValueForFormGroup();
    }
  }

  createFormGroup() {
    this.form = this.fb.group({
      namHoc: ['', [Validators.required]],
      batDauHuongDan: [null, [Validators.required]],
      ketThucHuongDan: [null, [Validators.required]],
      batDauDangKy: [null, [Validators.required]],
      ketThucDangKy: [null, [Validators.required]],
      batDauKiemTraDanhGia: [null, [Validators.required]],
      ketThucKiemTraDanhGia: [null, [Validators.required]],
      batDauXetDuyet: [null, [Validators.required]],
      ketThucXetDuyet: [null, [Validators.required]],
      batDauKyHopDong: [null, [Validators.required]],
      ketThucKyHopDong: [null, [Validators.required]],
      batDauThucHien: [null, [Validators.required]],
      yeuCauBoSungThuyetMinh: [null, [Validators.required]],
      ketThucThucHien: [null, [Validators.required]],
      batDauNghiemThu1: [null, [Validators.required]],
      ketThucNghiemThu1: [null, [Validators.required]],
      batDauNghiemThu2: [null, [Validators.required]],
      ketThucNghiemThu2: [null, [Validators.required]],
      batDauThanhQuyetToan: [null, [Validators.required]],
      ketThucThanhQuyetToan: [null, [Validators.required]],
    });
  }

  onSetValueForFormGroup(yearInput?: number) {
    if (yearInput) {
      const tmpTgqt = new ThoiGianQuyTrinh(yearInput);
      this.form.patchValue({
        namHoc: tmpTgqt.namHoc,
        batDauHuongDan: tmpTgqt.batDauHuongDan,
        ketThucHuongDan: tmpTgqt.ketThucHuongDan,
        batDauDangKy: tmpTgqt.batDauDangKy,
        ketThucDangKy: tmpTgqt.ketThucDangKy,
        batDauKiemTraDanhGia: tmpTgqt.batDauKiemTraDanhGia,
        ketThucKiemTraDanhGia: tmpTgqt.ketThucKiemTraDanhGia,
        batDauXetDuyet: tmpTgqt.batDauXetDuyet,
        ketThucXetDuyet: tmpTgqt.ketThucXetDuyet,
        batDauKyHopDong: tmpTgqt.batDauKyHopDong,
        ketThucKyHopDong: tmpTgqt.ketThucKyHopDong,
        batDauThucHien: tmpTgqt.batDauThucHien,
        yeuCauBoSungThuyetMinh: tmpTgqt.yeuCauBoSungThuyetMinh,
        ketThucThucHien: tmpTgqt.ketThucThucHien,
        batDauNghiemThu1: tmpTgqt.batDauNghiemThu1,
        ketThucNghiemThu1: tmpTgqt.ketThucNghiemThu1,
        batDauNghiemThu2: tmpTgqt.batDauNghiemThu2,
        ketThucNghiemThu2: tmpTgqt.ketThucNghiemThu2,
        batDauThanhQuyetToan: tmpTgqt.batDauThanhQuyetToan,
        ketThucThanhQuyetToan: tmpTgqt.ketThucThanhQuyetToan,
      });
    } else {
      this.form.patchValue({
        namHoc: this.modalData.data?.namHoc,
        batDauHuongDan: this.modalData.data?.batDauHuongDan,
        ketThucHuongDan: this.modalData.data?.ketThucHuongDan,
        batDauDangKy: this.modalData.data?.batDauDangKy,
        ketThucDangKy: this.modalData.data?.ketThucDangKy,
        batDauKiemTraDanhGia: this.modalData.data?.batDauKiemTraDanhGia,
        ketThucKiemTraDanhGia: this.modalData.data?.ketThucKiemTraDanhGia,
        batDauXetDuyet: this.modalData.data?.batDauXetDuyet,
        ketThucXetDuyet: this.modalData.data?.ketThucXetDuyet,
        batDauKyHopDong: this.modalData.data?.batDauKyHopDong,
        ketThucKyHopDong: this.modalData.data?.ketThucKyHopDong,
        batDauThucHien: this.modalData.data?.batDauThucHien,
        yeuCauBoSungThuyetMinh: this.modalData.data?.yeuCauBoSungThuyetMinh,
        ketThucThucHien: this.modalData.data?.ketThucThucHien,
        batDauNghiemThu1: this.modalData.data?.batDauNghiemThu1,
        ketThucNghiemThu1: this.modalData.data?.ketThucNghiemThu1,
        batDauNghiemThu2: this.modalData.data?.batDauNghiemThu2,
        ketThucNghiemThu2: this.modalData.data?.ketThucNghiemThu2,
        batDauThanhQuyetToan: this.modalData.data?.batDauThanhQuyetToan,
        ketThucThanhQuyetToan: this.modalData.data?.ketThucThanhQuyetToan,
      });
    }
  }

  generateTimeLine(): void {
    this.onSetValueForFormGroup();
    this.inputYear = new Date().getFullYear();
    this.nzModalSvc.confirm({
      nzTitle: this.languageData[this.langCode].GENERATE_TIMELINE,
      nzContent: this.genYear,
      nzOkText: this.languageData[this.langCode].OK,
      nzCancelText: this.languageData[this.langCode].CANCEL,
      nzOnOk: () => {
        this.onSetValueForFormGroup(this.inputYear);
      }
    });
  }

  swapDateRange(formControlNameA: string, formControlNameB: string): void {
    if (this.form.get(formControlNameA).value && this.form.get(formControlNameB).value &&
      this.form.get(formControlNameA).value > this.form.get(formControlNameB).value) {
      const temp = this.form.get(formControlNameA).value;
      this.form.get(formControlNameA).setValue(this.form.get(formControlNameB).value);
      this.form.get(formControlNameB).setValue(temp);
    }
  }

  checkValidInputGenYear(input: number): boolean {
    if (!input) {
      return false;
    } else if (input.toString().split('').length !== 4) {
      return false;
    } else if (input < 1950) {
      return false;
    } else {
      return true;
    }
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     //
  //   } else {
  //     this.validatorService.validateAllFormFields(this.form);
  //   }
  // }


  onSubmit(): void {
    if (this.form.valid) {
      this.spinner.show();
      if (this.modalData.action === SystemConstant.ACTION.ADD) {
        this.thoiGianQuyTrinhSvc.createThoiGianQuyTrinh(this.form.value)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
            this.closePopup.emit(true);
            this.spinner.hide();
          },
          () => this.spinner.hide());
      } else { // edit
        this.thoiGianQuyTrinhSvc.updateThoiGianQuyTrinh( this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
            this.closePopup.emit(true);
            this.spinner.hide();
          },
          () => this.spinner.hide());
      }
    } else {
      this.validatorService.validateAllFormFields(this.form);
    }
  }
  onCancel() {
    this.closePopup.emit(false);
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
