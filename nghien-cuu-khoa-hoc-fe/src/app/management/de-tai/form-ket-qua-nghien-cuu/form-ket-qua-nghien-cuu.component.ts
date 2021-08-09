import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { KetQuaNghienCuuBM1011 } from 'src/app/core/models/bieu-mau/bm10-11-ket-qua-nghien-cuu.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { KetQuaNghienCuuService } from 'src/app/core/services/management/de-tai/ket-qua-nghien-cuu.service';

@Component({
  selector: 'app-form-ket-qua-nghien-cuu',
  templateUrl: './form-ket-qua-nghien-cuu.component.html',
  styleUrls: ['./form-ket-qua-nghien-cuu.component.scss']
})
export class FormKetQuaNghienCuuComponent implements OnInit {

  @Input() modalData: ModalData<KetQuaNghienCuuBM1011>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  tableLoading = false;

  vnTabValid = true;
  enTabValid = true;
  ketQuaTiengAnh = false;


  constructor(
    private fbd: FormBuilder,
    private ketQuaNghienCuuSvc: KetQuaNghienCuuService,
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
        coQuanChuTriDeTai: this.modalData.data.coQuanChuTriDeTai,
        coQuanChuTriDeTaiEn: this.modalData.data.coQuanChuTriDeTaiEn,
        thoiGianThucHien: this.modalData.data.thoiGianThucHien,
        mucTieuDeTai: this.modalData.data.mucTieuDeTai,
        mucTieuDeTaiEn: this.modalData.data.mucTieuDeTaiEn,
        tinhMoiVaSangTao: this.modalData.data.tinhMoiVaSangTao,
        tinhMoiVaSangTaoEn: this.modalData.data.tinhMoiVaSangTaoEn,
        ketQuaNghienCuu: this.modalData.data.ketQuaNghienCuu,
        ketQuaNghienCuuEn: this.modalData.data.ketQuaNghienCuuEn,
        sanPham: this.modalData.data.sanPham,
        sanPhamEn: this.modalData.data.sanPhamEn,
        hieuQuaPhuongThucChuyenGiao: this.modalData.data.hieuQuaPhuongThucChuyenGiao,
        hieuQuaPhuongThucChuyenGiaoEn: this.modalData.data.hieuQuaPhuongThucChuyenGiaoEn,
      });
    }
  }

  createForm() {
    this.form = this.fbd.group({
      tenDeTai: ['', [Validators.required]],
      tenDeTaiEn: ['', [Validators.required]],
      maSoDeTai: ['', [Validators.required]],
      chuNhiemDeTai: ['', [Validators.required]],
      coQuanChuTriDeTai: ['', [Validators.required]],
      coQuanChuTriDeTaiEn: ['', [Validators.required]],
      thoiGianThucHien: ['', [Validators.required]],
      mucTieuDeTai: ['', [Validators.required]],
      mucTieuDeTaiEn: ['', [Validators.required]],
      tinhMoiVaSangTao: ['', [Validators.required]],
      tinhMoiVaSangTaoEn: ['', [Validators.required]],
      ketQuaNghienCuu: ['', [Validators.required]],
      ketQuaNghienCuuEn: ['', [Validators.required]],
      sanPham: ['', [Validators.required]],
      sanPhamEn: ['', [Validators.required]],
      hieuQuaPhuongThucChuyenGiao: ['', [Validators.required]],
      hieuQuaPhuongThucChuyenGiaoEn: ['', [Validators.required]],
    });
  }

  themSanPham() { }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.ketQuaNghienCuuSvc.updateKetQuaNghienCuu(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.ketQuaNghienCuuSvc.createKetQuaNghienCuu(this.form.value)
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
