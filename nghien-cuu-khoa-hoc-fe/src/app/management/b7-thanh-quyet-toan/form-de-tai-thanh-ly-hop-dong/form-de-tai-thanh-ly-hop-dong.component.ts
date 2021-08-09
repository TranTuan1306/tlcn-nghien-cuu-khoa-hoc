import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-form-de-tai-thanh-ly-hop-dong',
  templateUrl: './form-de-tai-thanh-ly-hop-dong.component.html',
  styleUrls: ['./form-de-tai-thanh-ly-hop-dong.component.scss']
})
export class FormDeTaiThanhLyHopDongComponent implements OnInit {

  @Input() deTaiData: DeTai;
  @Input() currentTabData: number;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() currentTabReturn: EventEmitter<number> = new EventEmitter<number>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  listTrangThaiDetai = SystemConstant.TRANG_THAI_DE_TAI_TITLE[this.langCode];

  // Upload file /////////////////////////////////////////
  // eslint-disable-next-line @typescript-eslint/member-ordering
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  extractFileFromListId = this.fileSvc.extractFileFromListId;

  // End Upload file //////////////////////////////////////

  form: FormGroup;
  currentTab = 0;

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<DeTai> = new ModalData<DeTai>();

  //Search
  searchTimeProcessChanged = new Subject<string>();
  searchValueTextChanged = new Subject<string>();

  // table
  loadingTable = false;

  // chọn đề tài
  checked = false;
  indeterminate = false;
  listOfCurrentPageDeTai: [] = []; //model là đề tài đã được ký hợp đồng
  setOfCheckedId = new Set<string>();
  currentMaDuyetDeTai = '';

  thoiGianQuyTrinhDefault = '';
  listThoiGianQuyTrinh: ThoiGianQuyTrinh[] = [];

  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();

  searchValue = '';
  isShow = false;

  fileToUpload: File = null;

  constructor(
    private fbd: FormBuilder,
    private alert: ToastrService,
    private fileSvc: FileControllerService,
    private deTaiSvc: DeTaiAdminService,
    private validatorService: ValidatorService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fbd.group({
      filePayMentRequest: [null, [Validators.required]],
      fileEquipmentDeliveryRecord: [null, [Validators.required]],
      fileContractLiqudationMinues: [null, [Validators.required]],
    });
    this.patchValue();
  }

  patchValue() {
    this.form.patchValue({
      filePayMentRequest: this.deTaiData?.fileDeNghiThanhToans[this.deTaiData?.fileDeNghiThanhToans.length - 1] === undefined
        ? null : this.deTaiData?.fileDeNghiThanhToans[this.deTaiData?.fileDeNghiThanhToans.length - 1],
      fileEquipmentDeliveryRecord: this.deTaiData?.fileBanGiaoThietBis[this.deTaiData?.fileBanGiaoThietBis.length - 1] === undefined
        ? null : this.deTaiData?.fileBanGiaoThietBis[this.deTaiData?.fileBanGiaoThietBis.length - 1],
      fileContractLiqudationMinues: this.deTaiData?.fileThanhLyHopDongs[this.deTaiData?.fileThanhLyHopDongs.length - 1] === undefined
        ? null : this.deTaiData?.fileThanhLyHopDongs[this.deTaiData?.fileThanhLyHopDongs.length - 1],
    });
  }

  onSubmitContractLiqudationMinues() {
    if (this.form.get('fileContractLiqudationMinues').valid) {
      this.deTaiSvc.uploadFileMinhChungThanhLyHopDong(this.deTaiData.id, this.form.get('fileContractLiqudationMinues').value)
        .subscribe(() => {
          this.alert.success(MessageConstant[this.langCode].MSG_UPLOADED_DONE);
          this.returnData.emit(true);
          this.currentTabReturn.emit(this.currentTabData);
        });
    } else {
      this.validatorService.validateAllFormFields(this.form);
    }
  }

  onSubmitEquipmentDeliveryRecord() {
    if (this.form.get('fileEquipmentDeliveryRecord').valid) {
      this.deTaiSvc.uploadFileMinhChungBienBanBanGiaoThietBi(this.deTaiData.id, this.form.get('fileEquipmentDeliveryRecord').value)
        .subscribe(() => {
          this.alert.success(MessageConstant[this.langCode].MSG_UPLOADED_DONE);
          this.returnData.emit(true);
          this.currentTabReturn.emit(this.currentTabData);
        });
    } else {
      this.validatorService.validateAllFormFields(this.form);
    }
  }

  onSubmitPayMentRequest() {
    if (this.form.get('filePayMentRequest').valid) {
      this.deTaiSvc.uploadFileMinhChungDeNghiThanhToan(this.deTaiData.id, this.form.get('filePayMentRequest').value)
        .subscribe(() => {
          this.alert.success(MessageConstant[this.langCode].MSG_UPLOADED_DONE);
          this.returnData.emit(true);
          this.currentTabReturn.emit(this.currentTabData);
        });
    } else {
      this.validatorService.validateAllFormFields(this.form);
    }
  }

  selectedIndexChange(index: number) {
    this.currentTabData = index;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string) {
    return (
      !this.form.get(field).valid && this.form.get(field).touched
    );
  }

}
