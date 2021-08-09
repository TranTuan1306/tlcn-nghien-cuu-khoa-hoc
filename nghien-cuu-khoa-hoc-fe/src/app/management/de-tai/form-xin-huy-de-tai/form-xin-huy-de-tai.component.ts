import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { DonXinHuyDeTaiBM09 } from 'src/app/core/models/bieu-mau/bm09-don-xin-huy-de-tai.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { DonXinHuyDeTaiService } from 'src/app/core/services/management/de-tai/don-xin-huy-de-tai.service';

@Component({
  selector: 'app-form-xin-huy-de-tai',
  templateUrl: './form-xin-huy-de-tai.component.html',
  styleUrls: ['./form-xin-huy-de-tai.component.scss']
})
export class FormXinHuyDeTaiComponent implements OnInit {

  @Input() modalData: ModalData<DonXinHuyDeTaiBM09>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  tableLoading = false;

  constructor(
    private fbd: FormBuilder,
    private huyDeTaiSvc: DonXinHuyDeTaiService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
  ) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        hoTenChuNhiemDeTai: this.modalData.data.tenDeTai,
        maSoChuNhiemDeTai: this.modalData.data.tenDeTai,
        hoTenThanhVienDeTai: this.modalData.data.tenDeTai,
        maSoThanhVienDeTai: this.modalData.data.tenDeTai,
        donViCongTac: this.modalData.data.tenDeTai,
        donViCongTacEn: this.modalData.data.tenDeTai,
        tenDeTaiEn: this.modalData.data.tenDeTai,
        maSoDeTai: this.modalData.data.tenDeTai,
        thoiGianThucHien: this.modalData.data.tenDeTai,
        lyDoHuyDeTai: this.modalData.data.tenDeTai,
        lyDoHuyDeTaiEn: this.modalData.data.tenDeTai,
        tongKinhPhiTheoHopDong: this.modalData.data.tenDeTai,
        soTienTamUng: this.modalData.data.tenDeTai,
        ngayTamUng: this.modalData.data.tenDeTai,
      });
    }
  }

  createForm() {
    this.form = this.fbd.group({
      hoTenChuNhiemDeTai: ['', [Validators.required]],
      maSoChuNhiemDeTai: ['', [Validators.required]],
      hoTenThanhVienDeTai: ['', [Validators.required]],
      maSoThanhVienDeTai: ['', [Validators.required]],
      donViCongTac: ['', [Validators.required]],
      donViCongTacEn: ['', [Validators.required]],
      tenDeTai: ['', [Validators.required]],
      tenDeTaiEn: ['', [Validators.required]],
      maSoDeTai: ['', [Validators.required]],
      thoiGianThucHien: ['', [Validators.required]],
      lyDoHuyDeTai: ['', [Validators.required]],
      lyDoHuyDeTaiEn: ['', [Validators.required]],
      tongKinhPhiTheoHopDong: ['', [Validators.required]],
      soTienTamUng: ['', [Validators.required]],
      ngayTamUng: ['', [Validators.required]]
    });
  }

  themNoiDung() { }
  themSanPham() { }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.huyDeTaiSvc.updateDonXinHuyDeTai(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.huyDeTaiSvc.createDonXinHuyDeTai(this.form.value)
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
