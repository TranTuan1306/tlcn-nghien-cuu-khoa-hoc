import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-form-bien-ban-hoi-dong',
  templateUrl: './form-bien-ban-hoi-dong.component.html',
  styleUrls: ['./form-bien-ban-hoi-dong.component.scss']
})
export class FormBienBanHoiDongComponent implements OnInit {

  @Input() modalData: ModalData<BienBanHoiDongNghiemThu>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  tableLoading = false;


  listFileDinhKem: { id: string; fileInfo: FileInfo }[] = [];

  constructor(
    private fbd: FormBuilder,
    private bienBanHoiDongNghiemThuSvc: HoiDongNghiemThuService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private fileSvc: FileControllerService,
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

  // Upload file /////////////////////////////////////////
  // eslint-disable-next-line @typescript-eslint/member-ordering
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  extractFileFromListId = this.fileSvc.extractFileFromListId;

  showFileName(idFile: string): string {
    const file = this.listFileDinhKem.find(x => x.id === idFile);
    return file ? file.fileInfo.tenFile : 'File không tồn tại';
  }

  // End Upload file //////////////////////////////////////

}
