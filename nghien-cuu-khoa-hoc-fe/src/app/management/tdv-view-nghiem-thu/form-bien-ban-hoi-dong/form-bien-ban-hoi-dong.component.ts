import { MessageConstant } from 'src/app/core/constants/message.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { HoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-form-bien-ban-hoi-dong-tdv',
  templateUrl: './form-bien-ban-hoi-dong.component.html',
  styleUrls: ['./form-bien-ban-hoi-dong.component.scss']
})
export class FormBienBanHoiDongComponent implements OnInit {

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
    private spinner: NgxSpinnerService,
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService,
    private nzModalSvc: NzModalService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.currentMaDuyetDeTai = this.modalDataBienBan.data.deTai.id;
  }

  createForm() {
    this.form = this.fbd.group({
      diemTrungBinhCuoi: ['', [Validators.required]],
      fileBienBanHoiDong: [null, [Validators.required]]
    });
    this.patchValue();
  }

  patchValue() {
    this.form.patchValue({
      diemTrungBinhCuoi: this.modalDataBienBan.data.diemTrungBinhCuoi,
      fileBienBanHoiDong: this.modalDataBienBan.data.fileBienBanHoiDong ?
        this.modalDataBienBan.data.fileBienBanHoiDong : null
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.hoiDongNghiemThuSvc.uploadBienBanHopHoiDong(
        this.form.get('diemTrungBinhCuoi').value,
        this.form.get('fileBienBanHoiDong').value,
        this.modalDataBienBan.data.id
      ).subscribe(() => {
        this.returnCurrentTab.emit(1);
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


  downloadFileBienBanHoiDong() {
    this.spinner.show();
    this.hoiDongNghiemThuSvc.exportBienBanHopHoiDongNghiemThu(this.modalDataBienBan.data.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM14T-bien-ban-hop-hoi-dong-danh-gia-nghiem-thu(${this.modalDataBienBan.data.tenHoiDong}).docx`
            : `BM14T-form-minutes-of-the-meeting-of-the-assessment-and-acceptance-council(${this.modalDataBienBan.data.tenHoiDong}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  convertFileFromBlob(data: Blob, fileName: string) {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
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
