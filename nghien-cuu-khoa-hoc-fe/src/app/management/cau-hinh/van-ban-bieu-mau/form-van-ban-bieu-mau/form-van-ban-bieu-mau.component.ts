import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { VanBanBieuMau } from 'src/app/core/models/management/cau-hinh/van-ban-bieu-mau.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { VanBanBieuMauService } from 'src/app/core/services/management/cau-hinh/van-ban-bieu-mau.service';

@Component({
  selector: 'app-form-van-ban-bieu-mau',
  templateUrl: './form-van-ban-bieu-mau.component.html',
  styleUrls: ['./form-van-ban-bieu-mau.component.scss']
})
export class FormVanBanBieuMauComponent implements OnInit {

  @Input() modalData: ModalData<VanBanBieuMau>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // Upload file /////////////////////////////////////////
  // eslint-disable-next-line @typescript-eslint/member-ordering
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  extractFileFromListId = this.fileSvc.extractFileFromListId;

  // End Upload file //////////////////////////////////////

  form: FormGroup;
  loaiVanBanBieuMau = SystemConstant.TYPE_DOCS_FORM_TITLE[this.langCode];

  constructor(
    private fb: FormBuilder,
    private vanBanBieuMauSvc: VanBanBieuMauService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private fileSvc: FileControllerService,
  ) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        loai: this.modalData.data.loai,
        tieuDe: this.modalData.data.tieuDe,
        tieuDeEn: this.modalData.data.tieuDeEn,
        fileDinhKem: this.modalData.data.fileDinhKem,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      loai: ['', [Validators.required]],
      tieuDe: ['', [Validators.required]],
      tieuDeEn: ['', [Validators.required]],
      fileDinhKem: [[], [Validators.required]],
    });
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.vanBanBieuMauSvc.updateVanBan(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.vanBanBieuMauSvc.createVanBan(this.form.value)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_CREATED_DONE);
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
}
