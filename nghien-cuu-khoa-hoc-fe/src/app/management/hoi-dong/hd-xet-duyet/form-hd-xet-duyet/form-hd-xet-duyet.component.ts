import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';

@Component({
  selector: 'app-form-hd-xet-duyet',
  templateUrl: './form-hd-xet-duyet.component.html',
  styleUrls: ['./form-hd-xet-duyet.component.scss']
})
export class FormHdXetDuyetComponent implements OnInit {

  @Input() modalData: ModalData<unknown>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;
  isFormTouched = false;

  listChucVuHoiDong = SystemConstant.CHUC_VU_HOI_DONG_TITLE[this.langCode];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listThanhVien: any[] = []; // ThanhVienHoiDong
  editCache: {
    [key: string]: {
      edit: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any; // ThanhVienHoiDong
    };
  } = {};
  editingId = '';

  listDeTai: DeTai[] = [];
  isLoading = false;
  searchDeTaiDebounce = new Subject<string>();

  constructor(private fb: FormBuilder,
    private validatorSvc: ValidatorService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        // tenHoiDong: this.modalData.data.tenHoiDong,
        // soQuyetDinhThanhLap: this.modalData.data.soQuyetDinhThanhLap,
      });
      // this.listThanhVien = this.modalData.data.danhSachThanhVien;
    }
    this.searchDeTaiDebounce.pipe(debounceTime(350))
      .subscribe(searchValue => {
      // Searching
        console.log('search value', searchValue);
        this.listDeTai = [];
        // Load done
        this.isLoading = false;
      });

  }

  createForm() {
    this.form = this.fb.group({
      tenHoiDong: ['', [Validators.required]],
      soQuyetDinhThanhLap: ['', [Validators.required]],
      danhSachThanhViens: [null, [Validators.required]],
      danhSachDeTai: [null, [Validators.required]],
    });
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    this.isFormTouched = true;
    const indexEmpty = this.listThanhVien.findIndex(x => !x.chucDanhKhoaHoc || !x.chucVuHoiDong || !x.chuyenMon ||
      !x.donViCongTac || !x.email || !x.hoTen || !x.hocHam || !x.hocVi || !x.soDienThoai);
    if (indexEmpty >= 0) {
      this.listThanhVien.splice(indexEmpty, 1);
      this.listThanhVien = [...this.listThanhVien];
    }

    if (this.editingId) {
      this.alert.warning(this.languageData[this.langCode].A_COUNCIL_MEMBER_NOT_DONE_YET);
      this.validatorSvc.validateAllFormFields(this.form);
    } else if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.alert.success('ok');
        //
      } else {
        //
      }
    } else {
      this.validatorSvc.validateAllFormFields(this.form);
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

  addBlankCell(): void {
    if (this.listThanhVien.findIndex(x => !x.chucDanhKhoaHoc || !x.chucVuHoiDong || !x.chuyenMon ||
      !x.donViCongTac || !x.email || !x.hoTen || !x.hocHam || !x.hocVi || !x.soDienThoai) >= 0) {
      this.alert.warning(this.languageData[this.langCode].A_COUNCIL_MEMBER_NOT_DONE_YET);
    } else {
      const newId = Math.floor(Math.random() * 1000000000).toString();
      this.listThanhVien.push({
        id: newId,
        chucDanhKhoaHoc: '',
        chucVuHoiDong: '',
        chuyenMon: '',
        donViCongTac: '',
        email: '',
        hoTen: '',
        hocHam: '',
        hocVi: '',
        soDienThoai: ''
      });
      this.updateEditCache();
      this.listThanhVien = [...this.listThanhVien];
      this.startEdit(newId);
    }
  }

  startEdit(id: string): void {
    this.updateEditCache();
    this.editingId = id;
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listThanhVien.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listThanhVien[index] },
      edit: false
    };
    this.editingId = '';
  }

  saveEdit(id: string): void {
    if (!this.editCache[id].data.chucDanhKhoaHoc || !this.editCache[id].data.chucVuHoiDong || !this.editCache[id].data.chuyenMon
      || !this.editCache[id].data.donViCongTac || !this.editCache[id].data.email || !this.editCache[id].data.hoTen
      || !this.editCache[id].data.hocHam || !this.editCache[id].data.hocVi || !this.editCache[id].data.soDienThoai) {
      this.alert.error(this.languageData[this.langCode].PLEASE_FINISH_COUNCIL_MEMBER);
    } else {
      const index = this.listThanhVien.findIndex(item => item.id === id);
      Object.assign(this.listThanhVien[index], this.editCache[id].data);
      this.editCache[id].edit = false;
      this.editingId = '';
      this.updateEditCache();
    }
  }

  deleteCell(id: string): void {
    this.listThanhVien.splice(this.listThanhVien.findIndex(x => x.id === id), 1);
    this.updateEditCache();
    this.listThanhVien = [...this.listThanhVien];
  }

  updateEditCache(): void {
    this.editCache = {};
    this.listThanhVien.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  getNameOfChucVu(id: string): string {
    const chucVu = this.listChucVuHoiDong.find(x => x.id === id);
    return chucVu ? chucVu.title : '';
  }

  onSearchDeTaiKoHoiDong(tenHoiDong: string) {
    this.searchDeTaiDebounce.next(tenHoiDong);
  }

}
