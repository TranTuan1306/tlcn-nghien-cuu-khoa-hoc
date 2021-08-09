import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { BienBanKiemTraBM08 } from 'src/app/core/models/bieu-mau/bm08-bien-ban-kiem-tra.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { BienBanKiemTraService } from 'src/app/core/services/management/de-tai/bien-ban-kiem-tra.service';

@Component({
  selector: 'app-form-bien-ban-kiem-tra',
  templateUrl: './form-bien-ban-kiem-tra.component.html',
  styleUrls: ['./form-bien-ban-kiem-tra.component.scss']
})
export class FormBienBanKiemTraComponent implements OnInit {

  @Input() modalData: ModalData<BienBanKiemTraBM08>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  tableLoading = false;

  constructor(
    private fbd: FormBuilder,
    private bienBanKiemTraSvc: BienBanKiemTraService,
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
        thoiGianThucHien: this.modalData.data.thoiGianThucHien,
        tongKinhPhi: this.modalData.data.tongKinhPhi,
        chuNhiemDeTai: this.modalData.data.chuNhiemDeTai,
        hoTenChucTrachDoanKiemTra: this.modalData.data.hoTenChucTrachDoanKiemTra,
        hoTenChucTrachDoanKiemTraEn: this.modalData.data.hoTenChucTrachDoanKiemTraEn,
        noiDungNghienCuu: this.modalData.data.noiDungNghienCuu,
        noiDungNghienCuuEn: this.modalData.data.noiDungNghienCuuEn,
        ketQuaNghienCuu: this.modalData.data.ketQuaNghienCuu,
        ketQuaNghienCuuEn: this.modalData.data.ketQuaNghienCuuEn,
        cacSanPham: this.modalData.data.cacSanPham,
        cacSanPhamEn: this.modalData.data.cacSanPhamEn,
        suDungKinhPhi: this.modalData.data.suDungKinhPhi,
        kienNghiCuaChuNhiemDeTaiVaCoQuanChuTri: this.modalData.data.kienNghiCuaChuNhiemDeTaiVaCoQuanChuTri,
        kienNghiCuaChuNhiemDeTaiVaCoQuanChuTriEn: this.modalData.data.kienNghiCuaChuNhiemDeTaiVaCoQuanChuTriEn,
        danhGiaTinhHinhThucHien: this.modalData.data.danhGiaTinhHinhThucHien,
        danhGiaTinhHinhThucHienEn: this.modalData.data.danhGiaTinhHinhThucHienEn,
        ketLuanCuaDoanKiemTra: this.modalData.data.ketLuanCuaDoanKiemTra,
        ketLuanCuaDoanKiemTraEn: this.modalData.data.ketLuanCuaDoanKiemTraEn,
      });
    }
  }

  createForm() {
    this.form = this.fbd.group({
      tenDeTai: ['', [Validators.required]],
      tenDeTaiEn: ['', [Validators.required]],
      maSoDeTai: ['', [Validators.required]],
      thoiGianThucHien: ['', [Validators.required]],
      tongKinhPhi: ['', [Validators.required]],
      chuNhiemDeTai: ['', [Validators.required]],
      hoTenChucTrachDoanKiemTra: ['', [Validators.required]],
      hoTenChucTrachDoanKiemTraEn: ['', [Validators.required]],
      noiDungNghienCuu: ['', [Validators.required]],
      noiDungNghienCuuEn: ['', [Validators.required]],
      ketQuaNghienCuu: ['', [Validators.required]],
      ketQuaNghienCuuEn: ['', [Validators.required]],
      cacSanPham: ['', [Validators.required]],
      cacSanPhamEn: ['', [Validators.required]],
      suDungKinhPhi: ['', [Validators.required]],
      kienNghiCuaChuNhiemDeTaiVaCoQuanChuTri: ['', [Validators.required]],
      kienNghiCuaChuNhiemDeTaiVaCoQuanChuTriEn: ['', [Validators.required]],
      danhGiaTinhHinhThucHien: ['', [Validators.required]],
      danhGiaTinhHinhThucHienEn: ['', [Validators.required]],
      ketLuanCuaDoanKiemTra: ['', [Validators.required]],
      ketLuanCuaDoanKiemTraEn: ['', [Validators.required]],
    });
  }

  themNoiDung() { }
  themSanPham() { }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.bienBanKiemTraSvc.updateBienBanKiemTra(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.bienBanKiemTraSvc.createBienBanKiemTra(this.form.value)
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
