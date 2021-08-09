import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { BaoCaoTienDoBM07, NoiDungNghienCuu, SanPhamNghienCuu } from 'src/app/core/models/bieu-mau/bm07-bao-cao-tien-do.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { TienDoThucHienDeTaiService } from 'src/app/core/services/management/de-tai/tien-do-thuc-hien-de-tai.service';

@Component({
  selector: 'app-form-bao-cao-tien-do',
  templateUrl: './form-bao-cao-tien-do.component.html',
  styleUrls: ['./form-bao-cao-tien-do.component.scss']
})
export class FormBaoCaoTienDoComponent implements OnInit {


  @Input() modalData: ModalData<BaoCaoTienDoBM07>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  listSanPhamNghienCuu: SanPhamNghienCuu[] = [];
  listNoiDungNghienCuu: NoiDungNghienCuu[] = [];
  tableLoading = false;

  constructor(
    private fbd: FormBuilder,
    private baoCaoTienDoSvc: TienDoThucHienDeTaiService,
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
        chuNhiem: this.modalData.data.chuNhiem,
        thoiGianThucHien: this.modalData.data.thoiGianThucHien,
        tongKinhPhi: this.modalData.data.tongKinhPhi,
        kinhPhiDuocCap: this.modalData.data.kinhPhiDuocCap,
        kinhPhiDaChi: this.modalData.data.kinhPhiDaChi,
        kinhPhiDaQuyetToan: this.modalData.data.kinhPhiDaQuyetToan,
        tuDanhGia: this.modalData.data.tuDanhGia,
        tuDanhGiaEn: this.modalData.data.tuDanhGiaEn,
        noiDungNghienCuu: this.modalData.data.noiDungNghienCuu,
        noiDungNghienCuuEn: this.modalData.data.noiDungNghienCuuEn,
        duKienKetQua: this.modalData.data.duKienKetQua,
        duKienKetQuaEn: this.modalData.data.duKienKetQuaEn,
        kinhPhiThucHien: this.modalData.data.kinhPhiThucHien,
        thoiGianNghiemThuDuKien: this.modalData.data.thoiGianNghiemThuDuKien,
        kienNghi: this.modalData.data.kienNghi,
        kienNghiEn: this.modalData.data.kienNghiEn
      });
    }
  }

  createForm() {
    this.form = this.fbd.group({
      tenDeTai: ['', [Validators.required]],
      tenDeTaiEn: ['', [Validators.required]],
      maSoDeTai: ['', [Validators.required]],
      chuNhiem: ['', [Validators.required]],
      thoiGianThucHien: ['', [Validators.required]],
      tongKinhPhi: ['', [Validators.required]],
      kinhPhiDuocCap: ['', [Validators.required]],
      kinhPhiDaChi: ['', [Validators.required]],
      kinhPhiDaQuyetToan: ['', [Validators.required]],
      tuDanhGia: ['', [Validators.required]],
      tuDanhGiaEn: ['', [Validators.required]],
      noiDungNghienCuu: ['', [Validators.required]],
      noiDungNghienCuuEn: ['', [Validators.required]],
      duKienKetQua: ['', [Validators.required]],
      duKienKetQuaEn: ['', [Validators.required]],
      kinhPhiThucHien: ['', [Validators.required]],
      hoanThanhDungHan: ['', [Validators.required]],
      hoanThanhTreHan: ['', [Validators.required]],
      thoiGianNghiemThuDuKien: ['', [Validators.required]],
      kienNghi: ['', [Validators.required]],
      kienNghiEn: ['', [Validators.required]],
    });
  }

  themNoiDung() { }
  themSanPham() { }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.baoCaoTienDoSvc.updateBaoCao(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.baoCaoTienDoSvc.createBaoCao(this.form.value)
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
