import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThanhVienHoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';

@Component({
  selector: 'app-form-bang-diem',
  templateUrl: './form-bang-diem.component.html',
  styleUrls: ['./form-bang-diem.component.scss']
})
export class FormBangDiemComponent implements OnInit {

  @Input() modalData: ModalData<ThanhVienHoiDongNghiemThu>;
  @Input() hoiDongId: string;
  @Input() deTaiId: string;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // Upload file /////////////////////////////////////////
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  extractFileFromListId = this.fileSvc.extractFileFromListId;
  // End Upload file //////////////////////////////////////
  currentMaDuyetDeTai = '';

  form: FormGroup;

  tableLoading = false;


  listFileDinhKem: { id: string; fileInfo: FileInfo }[] = [];

  constructor(
    private fbd: FormBuilder,
    private bangDiemHoiDongSvc: HoiDongNghiemThuService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private fileSvc: FileControllerService,
  ) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tongDiem: this.modalData.data.tongDiem,
        filePhieuDiemHoiDong: this.modalData.data.filePhieuDiemHoiDong,
      });
    }
    this.currentMaDuyetDeTai = this.deTaiId;
  }

  createForm() {
    this.form = this.fbd.group({
      tongDiem: ['', [Validators.required]],
      filePhieuDiemHoiDong: [null],
      fileNhanXetPhanBien: [null],
    });
    this.patchValue();
  }

  patchValue() {
    this.form.patchValue({
      tongDiem: this.modalData.data?.tongDiem,
      filePhieuDiemHoiDong: this.modalData.data?.filePhieuDiemHoiDong,
      fileNhanXetPhanBien: this.modalData.data?.fileNhanXetPhanBien,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.bangDiemHoiDongSvc.uploadPhieuNhanXetVaPhanBienCuaTungThanhVien(
        this.modalData.data.email,
        this.form.get('fileNhanXetPhanBien').value,
        this.form.get('filePhieuDiemHoiDong').value,
        this.form.get('tongDiem').value,
        this.hoiDongId
      ).subscribe(() => {
        this.returnData.emit(true);
        this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
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

  // End Upload file //////////////////////////////////////

}

