import { MessageConstant } from './../../../../core/constants/message.constant';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LoaiHinhNghienCuu } from 'src/app/core/models/management/danh-muc/loai-hinh-nghien-cuu.model';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { LoaiHinhNghienCuuService } from 'src/app/core/services/management/danh-muc/loai-hinh-nghien-cuu.service';

@Component({
  selector: 'app-form-loai-hinh-nghien-cuu',
  templateUrl: './form-loai-hinh-nghien-cuu.component.html',
  styleUrls: ['./form-loai-hinh-nghien-cuu.component.scss']
})
export class FormLoaiHinhNghienCuuComponent implements OnInit {

  @Input() modalData: ModalData<LoaiHinhNghienCuu>;
  @Input() totalElements: number;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;

  classicCkEditor = SystemConstant.configEditor5;

  //
  // totalElements = 0;

  constructor(
    private fbd: FormBuilder,
    private loaiHinhNghienCuuSvc: LoaiHinhNghienCuuService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fbd.group({
      maLoaiHinh: ['', [Validators.required]],
      tenLoaiHinh: ['', [Validators.required]],
      tenLoaiHinhEn: ['', [Validators.required]],
      thuTu: [this.totalElements ?? 1, [Validators.required]],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        maLoaiHinh: this.modalData.data.maLoaiHinh,
        tenLoaiHinh: this.modalData.data.tenLoaiHinh,
        tenLoaiHinhEn: this.modalData.data.tenLoaiHinhEn,
        thuTu: this.modalData.data.thuTu,
      });
    }
  }

  // getAllDataPaging() {
  //   this.loaiHinhNghienCuuSvc.findAllPaging(0, 10)
  //     .subscribe(res => {
  //       this.totalElements = res.totalElements + 1;
  //       this.createForm();
  //     });
  // }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.loaiHinhNghienCuuSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.loaiHinhNghienCuuSvc.create(this.form.value)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(MessageConstant[this.langCode].MSG_CREATED_DONE);
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

