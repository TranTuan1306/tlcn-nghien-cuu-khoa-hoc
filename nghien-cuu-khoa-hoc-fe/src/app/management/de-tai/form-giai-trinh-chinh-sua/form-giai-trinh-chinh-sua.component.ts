import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { GiaiTrinhChinhSua, GiaiTrinhChinhSuaBM16 } from 'src/app/core/models/bieu-mau/bm16-giai-trinh-chinh-sua.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { GiaiTrinhChinhSuaService } from 'src/app/core/services/management/de-tai/giai-trinh-chinh-sua.service';

@Component({
  selector: 'app-form-giai-trinh-chinh-sua',
  templateUrl: './form-giai-trinh-chinh-sua.component.html',
  styleUrls: ['./form-giai-trinh-chinh-sua.component.scss']
})
export class FormGiaiTrinhChinhSuaComponent implements OnInit {


  @Input() modalData: ModalData<GiaiTrinhChinhSuaBM16>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  tableLoading = false;
  listGiaiTrinhChinhSua: GiaiTrinhChinhSua[] = [];

  constructor(
    private fbd: FormBuilder,
    private giaiTrinhChinhSuaSvc: GiaiTrinhChinhSuaService,
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
        donViCongTac: this.modalData.data.donViCongTac,
        donViCongTacEn: this.modalData.data.donViCongTacEn,
        giaiTrinhChinhSua: this.modalData.data.giaiTrinhChinhSua,
      });
    }
  }

  createForm() {
    this.form = this.fbd.group({
      tenDeTai: ['', [Validators.required]],
      tenDeTaiEn: ['', [Validators.required]],
      maSoDeTai: ['', [Validators.required]],
      chuNhiemDeTai: ['', [Validators.required]],
      donViCongTac: ['', [Validators.required]],
      donViCongTacEn: ['', [Validators.required]],
      giaiTrinhChinhSua: [[]],
    });
  }

  themNoiDung() { }
  themSanPham() { }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.giaiTrinhChinhSuaSvc.updateGiaiTrinhChinhSua(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.giaiTrinhChinhSuaSvc.createGiaiTrinhChinhSua(this.form.value)
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

