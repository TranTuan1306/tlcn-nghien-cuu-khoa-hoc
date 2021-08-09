import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { DonXinHuyDeTaiBM09, TuChoiHuyDeTai } from 'src/app/core/models/bieu-mau/bm09-don-xin-huy-de-tai.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { DonXinHuyDeTaiService } from 'src/app/core/services/management/de-tai/don-xin-huy-de-tai.service';

@Component({
  selector: 'app-form-xem-de-nghi-huy',
  templateUrl: './form-xem-de-nghi-huy.component.html',
  styleUrls: ['./form-xem-de-nghi-huy.component.scss']
})
export class FormXemDeNghiHuyComponent implements OnInit {

  @Input() modalData: ModalData<DonXinHuyDeTaiBM09>;
  @Input() modalDataDuyetHuyDeTai: ModalData<TuChoiHuyDeTai>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
  @Output() closePopup: EventEmitter<unknown> = new EventEmitter<unknown>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;
  formKhongDongYHuy: FormGroup;
  classicCkEditor = SystemConstant.configEditor5;


  tableLoading = false;
  //Authen
  checkRole = false;
  constructor(
    private fbd: FormBuilder,
    private huyDeTaiSvc: DonXinHuyDeTaiService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private nzModalSvc: NzModalService,
  ) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.VIEW) {
      this.form.patchValue({
        hoTenChuNhiemDeTai: this.modalData.data.hoTenChuNhiemDeTai,
        maSoChuNhiemDeTai: this.modalData.data.maSoChuNhiemDeTai,
        hoTenThanhVienDeTai: this.modalData.data.hoTenThanhVienDeTai,
        maSoThanhVienDeTai: this.modalData.data.maSoThanhVienDeTai,
        donViCongTac: this.modalData.data.donViCongTac,
        donViCongTacEn: this.modalData.data.donViCongTacEn,
        tenDeTai: this.modalData.data.tenDeTai,
        tenDeTaiEn: this.modalData.data.tenDeTaiEn,
        maSoDeTai: this.modalData.data.maSoDeTai,
        thoiGianThucHien: this.modalData.data.thoiGianThucHien,
        lyDoHuyDeTai: this.modalData.data.lyDoHuyDeTai,
        lyDoHuyDeTaiEn: this.modalData.data.lyDoHuyDeTaiEn,
        tongKinhPhiTheoHopDong: this.modalData.data.tongKinhPhiTheoHopDong,
        soTienTamUng: this.modalData.data.soTienTamUng,
        ngayTamUng: this.modalData.data.ngayTamUng,
      });
    }
    this.createTuChoiHuyDeTai();
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

  createTuChoiHuyDeTai(): void {
    this.formKhongDongYHuy = this.fbd.group({
      noiDungTuChoi: [[]],
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

  onAdminDuyetYeuCauHuyDeTai(): void {
    // this.huyDeTaiSvc.onDongYHuyDeTai(this.modalDataDuyetHuyDeTai.data.idDeTai)
    //   .subscribe(res => {
    //     this.alert.success('Duyệt thành công!');
    //     this.closePopup.emit(res);
    //   });
  }

  onAdminTuChoiHuy(template: TemplateRef<void>): void {
    this.nzModalSvc.create({
      nzStyle: {},
      nzTitle: 'Không đồng ý huỷ đề tài',
      nzContent: template,
      nzOkText: 'Gửi',
      nzOnOk: () => {
        this.formKhongDongYHuy.get('deTai').setValue(this.modalData.data.id);
        if (this.formKhongDongYHuy.valid) {
          this.huyDeTaiSvc.createTuChoiHuyDeTai(this.formKhongDongYHuy.value)
            .subscribe(() => {
              this.alert.success('Gửi lý do thành công!');
              this.closePopup.emit(this.modalData.data);
            });
        } else {
          this.validatorSvc.validateAllFormFields(this.formKhongDongYHuy);
        }
      }
    });
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

  isFieldValidYeuCau(field: string) {
    return (
      !this.form.get(field).valid && this.form.get(field).touched
    );
  }

  displayFieldCssYeuCau(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
}
