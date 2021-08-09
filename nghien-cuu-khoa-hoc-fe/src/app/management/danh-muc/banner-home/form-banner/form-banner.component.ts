import { NgxSpinnerService } from 'ngx-spinner';
import { MessageConstant } from 'src/app/core/constants/message.constant';
import { BannerHomeService } from './../../../../core/services/management/danh-muc/banner.service';
import { FileService } from 'src/app/core/services/common/file.service';
import { EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { HomeBanner } from 'src/app/core/models/management/danh-muc/banner-home.model';

@Component({
  selector: 'app-form-banner',
  templateUrl: './form-banner.component.html',
  styleUrls: ['./form-banner.component.scss']
})
export class FormBannerComponent implements OnInit, OnChanges {

  @Input() modalData: ModalData<HomeBanner>;
  @Input() thuTu: string;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;
  imageChangedEvent: unknown;
  croppedImage = '';
  errLowQualityPicInput = false;

  constructor(
    private fb: FormBuilder,
    private validSvc: ValidatorService,
    private alert: ToastrService,
    private fileSvc: FileService,
    private bannerSvc: BannerHomeService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      tieuDe: ['', [Validators.required]],
      tieuDeEn: ['', [Validators.required]],
      thuTu: ['', [Validators.required]],
      lienKetNgoai: ['', [Validators.required]],
      fileBanner: [null]
    });
    this.patchValue();
  }

  ngOnChanges() {

  }



  patchValue() {
    this.form.get('thuTu').setValue(this.thuTu);
    this.form.get('lienKetNgoai').setValue(this.thuTu);
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tieuDe: this.modalData.data.tieuDe,
        tieuDeEn: this.modalData.data.tieuDeEn,
        lienKetNgoai: this.modalData.data.lienKetNgoai,
        thuTu: this.modalData.data.thuTu,
        fileBanner: this.modalData.data.fileBanner ? this.modalData.data.fileBanner : null,
      });
    }
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.ADD) {
        this.spinner.show();
        this.fileSvc.uploadFile(
          this.fileSvc.blobToFile(
            this.fileSvc.b64toBlob(this.croppedImage, 'image/png', 512),
            'banner-' + this.thuTu),
          'banner'
        ).subscribe(res => {
          this.form.get('fileBanner').setValue(res.id);
          this.bannerSvc.createBanner(this.form.value).subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
            this.returnData.emit(true);
            this.spinner.hide();
          }, () => this.spinner.hide());
        }, () => this.spinner.hide());
      } else {
        this.fileSvc.uploadFile(
          this.fileSvc.blobToFile(
            this.fileSvc.b64toBlob(this.croppedImage, 'image/png', 512),
            'banner-' + this.thuTu),
          'banner'
        ).subscribe(res => {
          this.form.get('fileBanner').setValue(res.id);
          this.bannerSvc.updateBanner(this.form.value, this.modalData.data.id).subscribe(() => {
            this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
            this.returnData.emit(true);
            this.spinner.hide();
          }, () => this.spinner.hide());
        }, () => this.spinner.hide());
      }

      // form get set banner, wait, check valid
    } else {
      this.validSvc.validateAllFormFields(this.form);
    }
  }

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
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

  fileChangeEvent(event: unknown): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageLoaded(image: any) {
    if (image.original.size.width < 1120 || image.original.size.height < 400) {
      this.errLowQualityPicInput = true;
    } else {
      this.errLowQualityPicInput = false;
    }
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    this.alert.error(this.languageData[this.langCode].CAN_NOT_OPEN_PICTURE);
  }


}
