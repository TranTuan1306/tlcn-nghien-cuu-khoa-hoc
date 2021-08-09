import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { BienBanHoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';

@Component({
  selector: 'app-bien-ban-hoi-dong',
  templateUrl: './bien-ban-hoi-dong.component.html',
  styleUrls: ['./bien-ban-hoi-dong.component.scss']
})
export class BienBanHoiDongComponent implements OnInit {

  @Input() modalData: ModalData<BienBanHoiDongNghiemThu>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  tableLoading = false;


  listFileDinhKem: { id: string; fileInfo: FileInfo }[] = [];
  fileViewId = '';

  constructor(
    private fbd: FormBuilder,
    private bienBanHoiDongNghiemThuSvc: HoiDongNghiemThuService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private fileSvc: FileControllerService,
    private nzModalSvc: NzModalService,
  ) { }

  ngOnInit() {
    this.createForm();
    // if (this.modalData.action === SystemConstant.ACTION.EDIT) {
    //   this.form.patchValue({
    //     tongDiem: this.modalData.data.tongDiem,
    //     tongDiemHopLe: this.modalData.data.tongDiemHopLe,
    //     ketLuan: this.modalData.data.ketLuan,
    //     xepLoai: this.modalData.data.xepLoai,
    //     fileBienBan: this.modalData.data.fileBienBan,
    //   });
    // }
  }

  createForm() {
    this.form = this.fbd.group({
      tongDiem: ['', [Validators.required]],
      tongDiemHopLe: ['', [Validators.required]],
      ketLuan: ['', [Validators.required]],
      yKienKhac: ['', [Validators.required]],
      xepLoai: ['', [Validators.required]],
      fileBienBan: [[]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.bienBanHoiDongNghiemThuSvc.updateBangDiem(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(this.languageData[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.bienBanHoiDongNghiemThuSvc.createBangBiem(this.form.value)
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

  downloadFile(id: string): void {
    this.fileSvc.downloadFile(id);
  }

  storeFileInfo(idFile: string, fileInfo: FileInfo): void {
    this.listFileDinhKem.push({ id: idFile, fileInfo });
  }

  showFileName(idFile: string): string {
    const file = this.listFileDinhKem.find(x => x.id === idFile);
    return file ? file.fileInfo.tenFile : this.languageData[this.langCode].FILE_NOT_FOUND;
  }

  openModalViewFile(idFile: string, template: TemplateRef<void>, width?: number): void {
    this.fileViewId = idFile;
    this.nzModalSvc.create({
      nzTitle: null,
      nzStyle: { top: '20px', width: width ? `${width}px` : '750px' },
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  hideModalViewFile(): void {
    this.nzModalSvc.closeAll();
  }

}
