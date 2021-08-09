import { MessageConstant } from './../../../core/constants/message.constant';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
// import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LinhVucNghienCuu } from 'src/app/core/models/management/danh-muc/linh-vuc-nghien-cuu.model';
import { SanPhamDuKien } from 'src/app/core/models/management/danh-muc/san-pham.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { LinhVucNghienCuuService } from 'src/app/core/services/management/danh-muc/linh-vuc-nghien-cuu.service';
import { DeTaiService } from 'src/app/core/services/user/de-tai.service';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-form01-de-xuat-de-tai',
  templateUrl: './form01-de-xuat-de-tai.component.html',
  styleUrls: ['./form01-de-xuat-de-tai.component.scss']
})
export class Form01DeXuatDeTaiComponent implements OnInit {

  @Input() modalData: ModalData<DeTai>;
  @Input() dotDangKyId: string;
  @Input() deTaiId: string;
  @Output() modalReturn: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  editor = Editor;
  cfgEditor = SystemConstant.configEditor5;

  form: FormGroup;
  listSanPhamDuKien: SanPhamDuKien;

  noiDungDeTai: DeTai = null;

  listLinhVuc: LinhVucNghienCuu[] = [];

  constructor(
    private fbd: FormBuilder,
    private validatorSvc: ValidatorService,
    private deTaiSvc: DeTaiService,
    private alert: ToastrService,
    private linhVucNghienCuuSvc: LinhVucNghienCuuService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getAllLinhVuc();
    // console.log('deTaiId', this.deTaiId, 'dotDangKyId', this.dotDangKyId);
  }

  createForm() {
    this.form = this.fbd.group({
      tenDeTai: ['', Validators.required],
      tenDeTaiEn: ['', Validators.required],
      linhVucNghienCuu: [null, Validators.required],
      tinhCapThiet: ['', Validators.required],
      mucTieu: ['', Validators.required],
      mucTieuEn: ['', Validators.required],
      noiDungChinh: ['', Validators.required],

      // sanPhamDuKien: [null, Validators.required],
      sanPhamKhoaHocDuKien: ['', Validators.required],
      sanPhamDaoTaoDuKien: ['', Validators.required],
      sanPhamUngDungDuKien: ['', Validators.required],
      sanPhamKhacDuKien: ['', Validators.required],

      hieuQuaDuKien: ['', Validators.required],
      nhuCauKinhPhiDuKien: [0, Validators.required],
      thoiGianNghienCuuDuKien: [0, Validators.required],
    });
  }

  onCancel() {
    this.modalReturn.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.noiDungDeTai !== null) {
        this.deTaiSvc.updateDeTai(this.noiDungDeTai.id, this.form.value)
          .subscribe(() => {
            // this.modalReturn.emit(false);
            this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.deTaiSvc.createDeTai(this.form.value)
          .subscribe(() => {
            // this.modalReturn.emit(false);
            this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
          });
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

  getAllLinhVuc(): void {
    this.linhVucNghienCuuSvc.findAll()
      .subscribe(res => this.listLinhVuc = res);
  }


}
