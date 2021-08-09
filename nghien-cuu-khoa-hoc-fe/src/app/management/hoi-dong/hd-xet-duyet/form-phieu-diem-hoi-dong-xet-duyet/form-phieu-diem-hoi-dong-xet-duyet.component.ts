import { ThanhVienHoiDongsGet } from './../../../../core/models/management/hoi-dong/hoi-dong-duyet-thuyet-minh-get.model';
import { BienBanHoiDongThuyetMinhGet, PhieuDiemThanhVienGet }
  from './../../../../core/models/management/hoi-dong/bien-ban-hoi-dong-tm-get.model';
import {
  Component, EventEmitter, Input, OnInit, Output, OnChanges,
  AfterContentChecked
} from '@angular/core';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Editor from 'src/assets/libs/ckeditor5/build/ckeditor';
import { FileService } from 'src/app/core/services/common/file.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BienBanHoiDongThuyetMinhService } from 'src/app/core/services/management/hoi-dong/bien-ban-hoi-dong-thuyet-minh.service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorService } from 'src/app/core/services/common/validator.service';


@Component({
  selector: 'app-form-phieu-diem-hoi-dong-xet-duyet',
  templateUrl: './form-phieu-diem-hoi-dong-xet-duyet.component.html',
  styleUrls: ['./form-phieu-diem-hoi-dong-xet-duyet.component.scss']
})
export class FormPhieuDiemHoiDongXetDuyetComponent implements OnInit, OnChanges, AfterContentChecked {
  @Input() modalBieuDiemData: ModalData<BienBanHoiDongThuyetMinhGet> = new ModalData<BienBanHoiDongThuyetMinhGet>();
  @Input() modalData: ModalData<PhieuDiemThanhVienGet> = new ModalData<PhieuDiemThanhVienGet>();
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
  @Output() returnBieuDiemData: EventEmitter<BienBanHoiDongThuyetMinhGet> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  extractFileFromListId = this.fileSvc.extractFileFromListId;

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  //ckedtor
  editor = Editor;
  cfgEditor = SystemConstant.configEditor5;

  systemConstant = SystemConstant;
  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;

  checkShowDom = false;

  form: FormGroup;

  currentIdDeTai = '';
  currentMaDuyetDeTai = '';
  // table
  listThanhVien: ThanhVienHoiDongsGet[];

  //Search
  searchValue = '';
  searchValueHoiDongKiemDuyet = new Subject<string>();
  searchValueBienBanHoiDong = new Subject<string>();
  constructor(
    private fb: FormBuilder,
    // private modalService: NzModalService,
    private fileSvc: FileService,
    private spinner: NgxSpinnerService,
    private bienBanHoiDongThuyetMinhSvc: BienBanHoiDongThuyetMinhService,
    private alert: ToastrService,
    private validatorSvc: ValidatorService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].BOARD_SCORE;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].BOARD_SCORE,
        link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG
      }
    ];
    this.handleFilterThanhVienChuaCoPhieuDiem();
    this.spinner.show();
    setTimeout(() => {
      this.createForm();
      this.spinner.hide();
    }, 100);
    this.handleFilterThanhVienChuaCoPhieuDiem();
    this.currentMaDuyetDeTai = this.modalBieuDiemData.data.deTai.id;

    // this.getBienBanHoiDongByIdHoiDongSetShowBtnAddNew();
    // this.searchValueBienBanHoiDong.pipe(debounceTime(300))
    //   .subscribe(searchValue => {
    //     this.getBienBanHoiDongByIdHoiDong(searchValue);
    //   });
  }
  ngAfterContentChecked(): void {
  }

  ngOnChanges() {
    // this.getBienBanHoiDongByIdHoiDong();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      filePhieuDiem: ['', [Validators.required]],
      tongDiem: ['', [Validators.required]],
      ykienKhac: ['', [Validators.required]],
    });
    this.checkShowDom = true;
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.patchValue();
    }
  }

  patchValue() {
    this.form.patchValue({
      email: this.modalData.data.thanhVien.email,
      filePhieuDiem: this.modalData.data.filePhieuDiem,
      tongDiem: this.modalData.data.tongDiem,
      ykienKhac: this.modalData.data.ykienKhac
    });
  }

  handleFilterThanhVienChuaCoPhieuDiem() {
    this.modalBieuDiemData.data.hoiDongXetDuyet.thanhVienHoiDongs =
      this.modalBieuDiemData.data.hoiDongXetDuyet.thanhVienHoiDongs
        .filter(({ thanhVien: thanhVien1 }) => !this.modalBieuDiemData.data.phieuDiemThanhViens
          .some(({ thanhVien: thanhVien2 }) => thanhVien2.email === thanhVien1.email));

    // arrayOne.filter(({ value: id1 }) => !arrayTwo.some(({ value: id2 }) => id2 === id1));

  }

  closeModal(status: boolean): void {
    if (status) {
    }
    this.modalRef.destroy();
  }

  onCancel() {
    this.returnData.emit(false);
  }
  onSubmit() {
    if (this.form.valid) {
      this.bienBanHoiDongThuyetMinhSvc
        .addPhieuDiemHoiDongThuyetMinh(this.modalBieuDiemData.data.id, this.form.value)
        .subscribe((res) => {
          this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          this.returnData.emit(true);
          this.returnBieuDiemData.emit(res);
        });
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
}
