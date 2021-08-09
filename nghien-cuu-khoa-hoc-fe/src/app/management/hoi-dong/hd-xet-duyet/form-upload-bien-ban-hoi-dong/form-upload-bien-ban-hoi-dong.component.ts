import { BienBanHoiDongThuyetMinhGet } from 'src/app/core/models/management/hoi-dong/bien-ban-hoi-dong-tm-get.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { NhanVienEd } from 'src/app/core/models/management/de-tai/nhan-vien-ed.model';
import { HoiDongDuyetThuyetMinhGet } from 'src/app/core/models/management/hoi-dong/hoi-dong-duyet-thuyet-minh-get.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { FileService } from 'src/app/core/services/common/file.service';
import { BienBanHoiDongThuyetMinhService } from 'src/app/core/services/management/hoi-dong/bien-ban-hoi-dong-thuyet-minh.service';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';

@Component({
  selector: 'app-form-upload-bien-ban-hoi-dong',
  templateUrl: './form-upload-bien-ban-hoi-dong.component.html',
  styleUrls: ['./form-upload-bien-ban-hoi-dong.component.scss']
})
export class FormUploadBienBanHoiDongComponent implements OnInit {
  @Input() modalDataUploadBienBan: ModalData<BienBanHoiDongThuyetMinhGet>;
  @Input() deTaiId: string;
  @Input() bienBanHoiDongId: string;
  @Input() hoiDongId: string;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant;
  //ckedtor
  editor = Editor;
  cfgEditor = SystemConstant.configEditor5;

  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  extractFileFromListId = this.fileSvc.extractFileFromListId;
  currentMaDuyetDeTai = '';

  form: FormGroup;
  isFormTouched = false;

  showForm = false;

  listChucVuHoiDong = SystemConstant.CHUC_VU_HOI_DONG_TITLE[this.langCode];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listThanhVien: NhanVienEd[] = []; // ThanhVienHoiDong
  listThanhVienTemp: NhanVienEd[] = [];

  searchValueTextChanged = new Subject<string>();

  listHoiDongKiemDuyet: Paginate<HoiDongDuyetThuyetMinhGet> = new Paginate<HoiDongDuyetThuyetMinhGet>();

  constructor(
    private fb: FormBuilder,
    // private validatorSvc: ValidatorService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    private fileSvc: FileService,
    // private deTaiSvc: DeTaiAdminService,
    // private nhanVienSvc: NhanVienService,
    private bienBanHoiDongKiemDuyetSvc: BienBanHoiDongThuyetMinhService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.createForm();
    }, 100);
    this.currentMaDuyetDeTai = this.deTaiId;
    // this.searchValueTextChanged.pipe(debounceTime(300))
    //   .subscribe(searchValue => {
    //     // Searching

    //     // Load done
    //     this.isLoading = false;
    //   });
  }

  createForm() {
    this.form = this.fb.group({
      bienBanHoiDong: ['', [Validators.required]],
      deTaiId: ['', [Validators.required]],
      hoiDongId: ['', [Validators.required]],
      ketLuan: [true, [Validators.required]],
      khachMoi: ['', [Validators.required]],
      kienNghiHoiDong: ['', [Validators.required]]
    });
    if (this.modalDataUploadBienBan.action === SystemConstant.ACTION.EDIT) {
      this.patchValue();
    }
    this.showForm = true;
    this.spinner.hide();
  }

  checkBienEdit() {
    return this.listThanhVienTemp.some(x => x.isEdit);
  }

  patchValue() {
    this.form.patchValue({
      bienBanHoiDong: this.modalDataUploadBienBan.data.bienBanHoiDong,
      deTaiId: this.deTaiId,
      hoiDongId: this.hoiDongId,
      ketLuan: this.modalDataUploadBienBan.data.ketLuan,
      khachMoi: this.modalDataUploadBienBan.data.khachMoi,
      kienNghiHoiDong: this.modalDataUploadBienBan.data.kienNghiHoiDong
    });
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    this.form.get('deTaiId').setValue(this.deTaiId);
    this.form.get('hoiDongId').setValue(this.hoiDongId);
    if (this.form.valid) {
      this.bienBanHoiDongKiemDuyetSvc.uploadBienBanHoiDongXetDuyet(
        this.bienBanHoiDongId, this.form.value
      ).subscribe(()=>{
        this.alert.success(MessageConstant[this.langCode].MSG_UPLOADED_DONE);
        this.returnData.emit(true);
      });
    } else {
      this.alert.warning(MessageConstant[this.langCode].MSG_FIELD_EMPTY);
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
