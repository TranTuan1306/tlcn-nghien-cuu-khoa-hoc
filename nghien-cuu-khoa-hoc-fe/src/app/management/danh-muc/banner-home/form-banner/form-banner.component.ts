import { EventEmitter, Input, Output } from '@angular/core';
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
export class FormBannerComponent implements OnInit {

  @Input() modalData: ModalData<HomeBanner>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;
  imageChangedEvent: unknown;
  croppedImage = '';
  errLowQualityPicInput = false;

  constructor(
    private fb: FormBuilder,
    private validSvc: ValidatorService,
    private alert: ToastrService,
  ) { }

  ngOnInit() {
    this.createForm();
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        tieuDe: this.modalData.data.tieuDe,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      tieuDe: ['', [Validators.required]],
      anhBanner: ['', [Validators.required]]
    });
  }

  onCancel() {
    this.returnData.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      // form get set banner, wait, check valid
    } else {
      this.validSvc.validateAllFormFields(this.form);
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
