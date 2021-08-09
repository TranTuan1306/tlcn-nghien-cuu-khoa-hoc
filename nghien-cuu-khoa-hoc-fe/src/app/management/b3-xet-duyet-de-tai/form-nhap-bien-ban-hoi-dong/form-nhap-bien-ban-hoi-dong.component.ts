import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';

@Component({
  selector: 'app-form-nhap-bien-ban-hoi-dong',
  templateUrl: './form-nhap-bien-ban-hoi-dong.component.html',
  styleUrls: ['./form-nhap-bien-ban-hoi-dong.component.scss']
})
export class FormNhapBienBanHoiDongComponent implements OnInit {

  @Input() modalData: ModalData<DeTai>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalDataPhieuDiem: ModalData<string> = new ModalData<string>();

  // Upload file /////////////////////////////////////////
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  extractFileFromListId = this.fileSvc.extractFileFromListId;
  // End Upload file //////////////////////////////////////
  currentMaDuyetDeTai = '';
  constructor(private fb: FormBuilder,
    private validatorSvc: ValidatorService,
    private fileSvc: FileControllerService,
    private alert: ToastrService) { }

  ngOnInit() {
    this.currentMaDuyetDeTai = this.modalData.data.id;
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      deTaiId: [this.modalData.data.id, [Validators.required]],
      hoiDongId: [this.modalData.data.id, [Validators.required]],
      phieuDiemThanhViens: [this.modalData.data.id, [Validators.required]],
      tongDiem: [0, [Validators.required]],
      khachMoi: [''],
      kienNghiHoiDong: [''],
      ketLuan: [true],
      bienBanHoiDong: ['', [Validators.required]],
    });
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
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

  closeModalPhieuDiem(status: boolean): void {
    if (status) {
      this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
    }
    this.modalRef.destroy();
  }
}
