import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { KetQuaNghienCuuService } from 'src/app/core/services/management/de-tai/ket-qua-nghien-cuu.service';

@Component({
  selector: 'app-research-results',
  templateUrl: './research-results.component.html',
  styleUrls: ['./research-results.component.scss', '../../../assets/journey-theme/css/main.css']
})
export class ResearchResultsComponent implements OnInit {

  @Input() modalData: ModalData<DeTai>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  isShown = false;

  tableLoading = false;
  listGiaiTrinhChinhSua: DeTai[] = [];

  constructor(
    private fbd: FormBuilder,
    private ketQuaNghienCuuSvc: KetQuaNghienCuuService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
  ) { }

  ngOnInit() {
    this.createForm();
    // if (this.modalData.action === SystemConstant.ACTION.EDIT) {
    //   this.form.patchValue({
    //     tinhMoiSangTao: this.modalData.data.tinhMoiSangTao,
    //     tinhMoiSangTaoEn: this.modalData.data.tinhMoiSangTaoEn,
    //     ketQuaNghienCuu: this.modalData.data.ketQuaNghienCuu,
    //     ketQuaNghienCuuEn: this.modalData.data.ketQuaNghienCuuEn,
    //     hieuQuaChuyenGiaoApDung: this.modalData.data.hieuQuaChuyenGiaoApDung,
    //     hieuQuaChuyenGiaoApDungEn: this.modalData.data.hieuQuaChuyenGiaoApDungEn,
    //     sanPhamKetQua: this.modalData.data.sanPhamKetQua,
    //     sanPhamKetQuaEn: this.modalData.data.sanPhamKetQuaEn,
    //   });
    // }
  }

  createForm() {
    this.form = this.fbd.group({
      tinhMoiSangTao: ['', [Validators.required]],
      tinhMoiSangTaoEn: ['', [Validators.required]],
      ketQuaNghienCuu: ['', [Validators.required]],
      ketQuaNghienCuuEn: ['', [Validators.required]],
      hieuQuaChuyenGiaoApDung: ['', [Validators.required]],
      hieuQuaChuyenGiaoApDungEn: ['', [Validators.required]],
      sanPhamKetQua: [[]],
      sanPhamKetQuaEn: [[]],
    });
  }

  themNoiDung() { }
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

  toggleShow() {
    this.isShown = !this.isShown;
  }
}

