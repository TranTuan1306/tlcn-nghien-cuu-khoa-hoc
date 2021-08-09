import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { HoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-form-giai-trinh-chinh-sua-tdv',
  templateUrl: './form-giai-trinh-chinh-sua.component.html',
  styleUrls: ['./form-giai-trinh-chinh-sua.component.scss']
})
export class FormGiaiTrinhChinhSuaComponent implements OnInit {

  @Input() modalDataBienBan: ModalData<HoiDongNghiemThu>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
  @Output() returnCurrentTab: EventEmitter<number> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
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
  currentMaDuyetDeTai = '';
  tableLoading = false;


  listFileDinhKem: { id: string; fileInfo: FileInfo }[] = [];
  selectedFileIdForView = '';
  viewModalRef: NzModalRef;

  constructor(
    private fbd: FormBuilder,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private fileSvc: FileControllerService,
    private deTaiSvc: DeTaiAdminService,
    private nzModalSvc: NzModalService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.currentMaDuyetDeTai = this.modalDataBienBan.data.deTai.id;
  }

  createForm() {
    this.form = this.fbd.group({
      fileGiaiTrinhChinhSua: [null, [Validators.required]]
    });
    this.patchValue();
  }

  patchValue() {
    this.form.patchValue({
      fileGiaiTrinhChinhSua: this.modalDataBienBan.data.deTai.fileGiaiTrinhChinhSuas.length > 0 ?
        this.modalDataBienBan.data.deTai.fileGiaiTrinhChinhSuas[this.modalDataBienBan.data.deTai.fileGiaiTrinhChinhSuas.length - 1] : null
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.deTaiSvc.uploadGiaiTrinhChinhSua(
        this.modalDataBienBan.data.deTai.id,
        this.form.get('fileGiaiTrinhChinhSua').value
      ).subscribe(() => {
        this.returnCurrentTab.emit(2);
        this.returnData.emit(true);
        this.alert.success(MessageConstant[this.langCode].MSG_UPLOADED_DONE);
      });
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

  showFileName(idFile: string): string {
    const file = this.listFileDinhKem.find(x => x.id === idFile);
    return file ? file.fileInfo.tenFile : 'File không tồn tại';
  }

  parseToNumer(value: string): string {
    if (value) {
      if (typeof value === 'string') {
        return isNaN(+value) ? '0' : value;
      } else if (typeof value === 'number') {
        return value;
      }
    } else {
      return '0';
    }
  }

  openModalViewFile(template: TemplateRef<unknown>, fileId: string): void {
    this.selectedFileIdForView = fileId;
    this.viewModalRef = this.nzModalSvc.create({
      nzWidth: 1000,
      nzTitle: this.langCode === 'vi' ? 'Xem file' : 'View file',
      nzMaskClosable: false,
      nzContent: template,
      nzOnOk: () => this.viewModalRef.close(),
      nzCancelText: null
    });
  }

}
