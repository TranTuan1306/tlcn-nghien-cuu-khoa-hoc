import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { BoSungThuyetMinhBM06 } from 'src/app/core/models/bieu-mau/bm06-bo-sung-thuyet-minh';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { BoSungThuyetMinhService } from 'src/app/core/services/management/de-tai/bo-sung-thuyet-minh.service';

@Component({
  selector: 'app-form-bo-sung-thuyet-minh',
  templateUrl: './form-bo-sung-thuyet-minh.component.html',
  styleUrls: ['./form-bo-sung-thuyet-minh.component.scss']
})
export class FormBoSungThuyetMinhComponent implements OnInit {

  @Input() modalData: ModalData<BoSungThuyetMinhBM06>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  tableLoading = false;

  constructor(
    private fbd: FormBuilder,
    private boSungThuyetMinhSvc: BoSungThuyetMinhService,
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
        hoTenHocViChuDanhChuNhiemDeTai: this.modalData.data.hoTenHocViChuDanhChuNhiemDeTai,
        hoTenHocViChuDanhChuNhiemDeTaiEn: this.modalData.data.hoTenHocViChuDanhChuNhiemDeTaiEn,
        coQuanChuTri: this.modalData.data.coQuanChuTri,
        coQuanChuTriEn: this.modalData.data.coQuanChuTriEn,
        thayDoiTenDeTai: this.modalData.data.thayDoiTenDeTai,
        thayDoiTenDeTaiEn: this.modalData.data.thayDoiTenDeTaiEn,
        thayDoiNoiDungKetQuaNghienCuu: this.modalData.data.thayDoiNoiDungKetQuaNghienCuu,
        thayDoiNoiDungKetQuaNghienCuuEn: this.modalData.data.thayDoiNoiDungKetQuaNghienCuuEn,
        thayDoiThanhVienThamGia: this.modalData.data.thayDoiThanhVienThamGia,
      });
    }
  }

  createForm() {
    this.form = this.fbd.group({
      tenDeTai: ['', [Validators.required]],
      tenDeTaiEn: ['', [Validators.required]],
      maSoDeTai: ['', [Validators.required]],
      hoTenHocViChuDanhChuNhiemDeTai: ['', [Validators.required]],
      hoTenHocViChuDanhChuNhiemDeTaiEn: ['', [Validators.required]],
      coQuanChuTri: ['', [Validators.required]],
      coQuanChuTriEn: ['', [Validators.required]],
      thayDoiTenDeTai: ['', [Validators.required]],
      thayDoiTenDeTaiEn: ['', [Validators.required]],
      thayDoiNoiDungKetQuaNghienCuu: ['', [Validators.required]],
      thayDoiNoiDungKetQuaNghienCuuEn: ['', [Validators.required]],
      thayDoiThanhVienThamGia: ['', [Validators.required]],
    });
  }

  themNoiDung() { }
  themSanPham() { }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.boSungThuyetMinhSvc.updateBoSungThuyetMinh(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.boSungThuyetMinhSvc.createBoSungThuyetMinh(this.form.value)
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
