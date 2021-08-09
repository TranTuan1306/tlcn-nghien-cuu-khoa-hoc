import { MessageConstant } from 'src/app/core/constants/message.constant';
import { DeTaiAdminService } from './../../../core/services/management/de-tai/de-tai-admin.service';
import { FileControllerService } from './../../../core/services/common/file-controller.service';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ToastrService } from 'ngx-toastr';
import { ValidatorService } from 'src/app/core/services/common/validator.service';

@Component({
  selector: 'app-form-duyet-huy-de-tai',
  templateUrl: './form-duyet-huy-de-tai.component.html',
  styleUrls: ['./form-duyet-huy-de-tai.component.scss']
})
export class FormDuyetHuyDeTaiComponent implements OnInit {
  @Input() approveData: boolean;
  @Input() modalDataDeTai: ModalData<DeTai>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant;
  form: FormGroup;

  editor = Editor;
  cfgEditor = SystemConstant.configEditor5;

  //authen
  checkRole = false;

  // Upload file /////////////////////////////////////////
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  extractFileFromListId = this.fileSvc.extractFileFromListId;
  // End Upload file //////////////////////////////////////
  currentMaDuyetDeTai = '';
  isShowForm = false;
  constructor(
    private fb: FormBuilder,
    private fileSvc: FileControllerService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private deTaiSvc: DeTaiAdminService,
  ) { }

  ngOnInit(): void {
    this.currentMaDuyetDeTai = this.modalDataDeTai.data.id;
    setTimeout(() => {
      this.createForm();
    }, 100);
  }

  createForm() {
    this.form = this.fb.group({
      noiDungEmailKhongDuyet: [null, [Validators.required]],
      fileId: [null, [Validators.required]]
    });
    this.isShowForm = true;
    this.spinner.hide();
  }

  onCancel() {
    this.returnData.emit(false);
  }

  approveCancelTopic() {
    if (this.form.get('fileId').value) {
      this.spinner.show();
      this.deTaiSvc.uploadMinhChungHuyDeTai(this.modalDataDeTai.data.id, this.form.get('fileId').value)
        .subscribe(()=>{
          this.spinner.hide();
          this.alert.success(MessageConstant[this.langCode].MSG_GUI_EMAIL_DONE);
          this.returnData.emit(true);
        }, ()=> this.spinner.hide());
    } else {
      this.alert.warning(MessageConstant[this.langCode].MGS_PLEASE_UPLOAD_FILE);
      this.validatorSvc.validateAllFormFields(this.form);
    }
  }

  rejectCancelTopic() {
    if (this.form.get('noiDungEmailKhongDuyet').value) {
      this.spinner.show();
      this.deTaiSvc.khongDuyetHuy(this.modalDataDeTai.data.id, this.form.get('noiDungEmailKhongDuyet').value)
        .subscribe(()=>{
          this.spinner.hide();
          this.alert.success(MessageConstant[this.langCode].MSG_GUI_EMAIL_DONE);
          this.returnData.emit(true);
        }, ()=> this.spinner.hide());
    } else {
      this.alert.warning(MessageConstant[this.langCode].MSG_FIELD_EMPTY);
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
