import { DeTaiAdminService } from '../../../core/services/management/de-tai/de-tai-admin.service';
import { DeTai } from '../../../core/models/management/de-tai/de-tai.model';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-kiem-duyet-de-tai-truong-don-vi',
  templateUrl: './form-kiem-duyet-de-tai-truong-don-vi.component.html',
  styleUrls: ['./form-kiem-duyet-de-tai-truong-don-vi.component.scss']
})
export class FormKiemDuyetDeTaiTruongDonViComponent implements OnInit {
  @Input() modalData: ModalData<DeTai> = new ModalData<DeTai>();
  @Output() modalReturn: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  currentUser = JSON.parse(localStorage.getItem('jwt_user_google'));
  ///////////////////////////////

  toggleEdit = false;

  editor = Editor;
  cfgEditor = SystemConstant.configEditor5;

  form: FormGroup;

  showForm = false;

  constructor(
    private spinner: NgxSpinnerService,
    private fbd: FormBuilder,
    private deTaiSvc: DeTaiAdminService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.spinner.show();
    setTimeout(() => {
      this.form = this.fbd.group({
        kinhPhiDuocPhanBo: ['', Validators.required],
        noiDungChinhSua: [null, Validators.required],
      });
      this.spinner.hide();
      this.showForm = true;
      this.form.get('kinhPhiDuocPhanBo').setValue(
        this.modalData.data.kinhPhiDuKien.tongKinhPhi.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    }, 100);
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string): boolean {
    return (
      !this.form.get(field).valid && this.form.get(field).touched
    );
  }

  onCancel() {
    this.modalReturn.emit(false);
  }

  onSubmit() {

  }

  sendMailToEdit() {
    if (this.form.valid) {
      this.form.get('kinhPhiDuocPhanBo').setValue(
        this.form.get('kinhPhiDuocPhanBo').value.toString().replace(/\./g, ''));
      this.deTaiSvc.sendMailToEditKhoa(this.modalData.data.id,
        Number(this.form.get('kinhPhiDuocPhanBo').value), this.form.get('noiDungChinhSua').value)
        .subscribe(() => {
          this.alert.success(MessageConstant[this.langCode].MSG_GUI_EMAIL_DONE);
          this.modalReturn.emit(true);
        });
    } else {
      this.validatorSvc.validateAllFormFields(this.form);
    }
  }
}
