import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ChiTietSanPham, SanPham } from 'src/app/core/models/management/danh-muc/san-pham.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { SanPhamService } from 'src/app/core/services/management/danh-muc/san-pham.service';

@Component({
  selector: 'app-form02bs-san-pham',
  templateUrl: './form02bs-san-pham.component.html',
  styleUrls: ['./form02bs-san-pham.component.scss']
})
export class Form02bsSanPhamComponent implements OnInit {

  @Input() modalData: ModalData<ChiTietSanPham>;
  @Output() returnData: EventEmitter<ChiTietSanPham> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;

  listSanPham: SanPham[] = [];
  listSanPhamSelect: SanPham[] = [];
  listLoaiSanPham = SystemConstant.LOAI_SAN_PHAM_TITLE[this.langCode];
  selectedLoaiSanPham: string = null;
  selectedSanPham: string = null;


  constructor(
    private fb: FormBuilder,
    private validSvc: ValidatorService,
    private sanPhamSvc: SanPhamService,
  ) { }

  ngOnInit(): void {
    this.listSanPhamSelect = [...this.listSanPham];
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      if (typeof this.modalData.data.sanPham === 'string') {
        this.selectedLoaiSanPham = SystemConstant.LOAI_SAN_PHAM.KHAC;
        this.form.patchValue({
          id: this.modalData.data.id,
          sanPham: this.modalData.data.sanPham,
          sanPhamEn: this.modalData.data.sanPhamEn,
          soLuong: this.modalData.data.soLuong,
          yeuCauKhoaHoc: this.modalData.data.yeuCauKhoaHoc,
        });
      } else {
        this.filterSanPhamSelectByLoaiSanPham(this.modalData.data.sanPham.loaiSanPham);
        this.getAllSanPhamByLoaiSanPhamAndTrangThaiTrue(this.modalData.data.sanPham.loaiSanPham);
        this.selectedLoaiSanPham = this.modalData.data.sanPham.loaiSanPham;
        this.selectedSanPham = this.modalData.data.sanPham.id;
        this.form.patchValue({
          id: this.modalData.data.id,
          sanPham: this.modalData.data.sanPham,
          sanPhamEn: this.modalData.data.sanPhamEn,
          soLuong: this.modalData.data.soLuong,
          yeuCauKhoaHoc: this.modalData.data.yeuCauKhoaHoc,
        });
      }
    }
    this.getAllSanPham();
  }

  createForm() {
    this.form = this.fb.group({
      id: [Math.floor(Math.random() * 10000000)],
      sanPham: [null, [Validators.required]],
      sanPhamEn: [null, [Validators.required]],
      soLuong: [1, [Validators.required]],
      yeuCauKhoaHoc: ['', [Validators.required]],
    });
  }

  onCancel() {
    this.returnData.emit(null);
  }

  onSubmit() {
    if (this.form.valid) {
      this.returnData.emit(this.form.value);
    } else {
      this.validSvc.validateAllFormFields(this.form);
    }
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

  filterSanPhamSelectByLoaiSanPham(loaiSp: string) {
    if (loaiSp) {
      this.listSanPhamSelect = [...this.listSanPham.filter(x => x.loaiSanPham === loaiSp)];
    } else {
      this.listSanPhamSelect = [...this.listSanPham];
    }
    this.form.get('sanPham').setValue(null);
  }

  selectSanPham(sanPhamId: string) {
    this.form.get('sanPham').setValue(this.listSanPham.find(x => x.id === sanPhamId));
  }

  getAllSanPham(): void {
    this.sanPhamSvc.getAllSanPham()
      .subscribe(res => this.listSanPham = res);
  }

  getAllSanPhamByLoaiSanPhamAndTrangThaiTrue(loaiSanPham: string) {
    this.sanPhamSvc.getAllSanPhamByLoaiSanPhamAndTrangThaiTrue(loaiSanPham)
      .subscribe(res => {
        this.listSanPhamSelect = res;
      });
  }

  handleSanPhamEn() {
    this.form.get('sanPhamEn').setValue(this.selectedSanPham);
  }

}
