import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ChiTietThanhToan, DeNghiThanhToanBM18 } from 'src/app/core/models/bieu-mau/bm18-de-nghi-thanh-toan.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { DeNghiThanhToanService } from 'src/app/core/services/management/de-tai/de-nghi-thanh-toan.service';

@Component({
  selector: 'app-form-de-nghi-thanh-toan',
  templateUrl: './form-de-nghi-thanh-toan.component.html',
  styleUrls: ['./form-de-nghi-thanh-toan.component.scss']
})
export class FormDeNghiThanhToanComponent implements OnInit {

  @Input() modalData: ModalData<DeNghiThanhToanBM18>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  listChiTietThanhToan: ChiTietThanhToan[] = [];

  form: FormGroup;

  tableLoading = false;

  constructor(
    private fbd: FormBuilder,
    private deNghiThanhToanSvc: DeNghiThanhToanService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
  ) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tenDeTai: this.modalData.data.tenDeTai,
        tenDeTaiEn: this.modalData.data.tenDeTaiEn,
        maSoDeTai: this.modalData.data.maSoDeTai,
        chuNhiemDeTai: this.modalData.data.chuNhiemDeTai,
        thoiGianThucHienTheoHopDong: this.modalData.data.thoiGianThucHienTheoHopDong,
        tongKinhPhi: this.modalData.data.tongKinhPhi,
        kinhPhiDaThanhToan: this.modalData.data.kinhPhiDaThanhToan,
        chiTietThanhToan: this.modalData.data.chiTietThanhToan,
        kinhPhiDaTamUng: this.modalData.data.kinhPhiDaTamUng,
        kinhPhiDeNghiBoSung: this.modalData.data.kinhPhiDeNghiBoSung,
      });
    }
  }

  createForm() {
    this.form = this.fbd.group({
      tenDeTai: ['', [Validators.required]],
      tenDeTaiEn: ['', [Validators.required]],
      maSoDeTai: ['', [Validators.required]],
      chuNhiemDeTai: ['', [Validators.required]],
      thoiGianThucHienTheoHopDong: ['', [Validators.required]],
      tongKinhPhi: ['', [Validators.required]],
      kinhPhiDaThanhToan: ['', [Validators.required]],
      chiTietThanhToan: ['', [Validators.required]],
      kinhPhiDaTamUng: ['', [Validators.required]],
      kinhPhiDeNghiBoSung: ['', [Validators.required]],
    });
  }

  themSanPham() { }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.deNghiThanhToanSvc.updateDeNghiThanhToan(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.deNghiThanhToanSvc.createDeNghiThanhToan(this.form.value)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_CREATED_DONE);
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
}

