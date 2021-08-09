import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { NhanVienExt } from 'src/app/core/models/common/hrm-nhan-vien.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LinhVucNghienCuu } from 'src/app/core/models/management/danh-muc/linh-vuc-nghien-cuu.model';
import { ThanhVienCungThamGia } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { LinhVucNghienCuuService } from 'src/app/core/services/management/danh-muc/linh-vuc-nghien-cuu.service';

@Component({
  selector: 'app-form02bs-thanh-vien-tham-gia',
  templateUrl: './form02bs-thanh-vien-tham-gia.component.html',
  styleUrls: ['./form02bs-thanh-vien-tham-gia.component.scss']
})
export class Form02bsThanhVienThamGiaComponent implements OnInit {

  @Input() modalData: ModalData<ThanhVienCungThamGia>;
  @Output() returnData: EventEmitter<ThanhVienCungThamGia> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  listLinhVuc: LinhVucNghienCuu[] = [];

  loadingSearchThanhVienThamGia = false;
  loadedListThanhVienForSelect: NhanVienExt[] = [];

  loadingSearchLinhVucChuyenMon = false;
  loadedListLinhVucForSelect: LinhVucNghienCuu[] = [];

  constructor(
    private fb: FormBuilder,
    private validSvc: ValidatorService,
    private linhVucNghienCuuSvc: LinhVucNghienCuuService,
  ) { }

  ngOnInit() {
    // this.getAllLinhVucChuyenMon();
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        id: this.modalData.data.id,
        hoTen: this.modalData.data.hoTen,
        donViCongTac: this.modalData.data.donViCongTac,
        linhVucChuyenMon: this.modalData.data.linhVucChuyenMon,
        noiDungNghienCuuDuocGiaos: this.modalData.data.noiDungNghienCuuDuocGiaos.join('\n'),
      });
    }
    this.getAllLinhVuc();
  }

  createForm() {
    this.form = this.fb.group({
      id: [Math.floor(Math.random() * 10000000)],
      hoTen: ['', [Validators.required]],
      donViCongTac: ['', [Validators.required]],
      linhVucChuyenMon: ['', [Validators.required]],
      noiDungNghienCuuDuocGiaos: ['', [Validators.required]],
    });
  }


  getAllLinhVuc(): void {
    console.log(this.listLinhVuc);
    this.linhVucNghienCuuSvc.findAll()
      .subscribe(res => this.listLinhVuc = res);
  }

  // getAllLinhVucChuyenMon(): void {
  //   this.loadedListLinhVucForSelect = [
  //     {
  //       id: '0',
  //       thuTu: 1,
  //       maLinhVuc: '1',
  //       tenLinhVuc: '0',
  //       tenLinhVucEn: '0e',
  //       trangThai: true
  //     },
  //     {
  //       id: '01',
  //       thuTu: 2,
  //       maLinhVuc: '2',
  //       tenLinhVuc: '1',
  //       tenLinhVucEn: '1e',
  //       trangThai: true
  //     },
  //   ];
  // }

  onCancel() {
    this.returnData.emit(null);
  }

  onSubmit() {
    if (this.form.valid) {
      const listTask = this.form.get('noiDungNghienCuuDuocGiaos').value.split(/\n/g);
      if (listTask.length === 1 && listTask[0] === '') {
        this.form.get('noiDungNghienCuuDuocGiaos').setValue([]);
        this.returnData.emit(this.form.value);
      } else {
        this.form.get('noiDungNghienCuuDuocGiaos').setValue(listTask);
        this.returnData.emit(this.form.value);
      }
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

  // onSearchLinhVuc(searchvalue: string): void {
  //   console.log(searchvalue);
  //   this.loadedListLinhVucForSelect = [
  //     {
  //       id: '0',
  //       thuTu: 1,
  //       maLinhVuc: '1',
  //       tenLinhVuc: '0',
  //       tenLinhVucEn: '0e',
  //       trangThai: true
  //     },
  //     {
  //       id: '01',
  //       thuTu: 2,
  //       maLinhVuc: '2',
  //       tenLinhVuc: '1',
  //       tenLinhVucEn: '1e',
  //       trangThai: true
  //     },
  //   ];
  // }

}
