import { MessageConstant } from './../../../../core/constants/message.constant';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { LinhVucNghienCuuService } from 'src/app/core/services/management/danh-muc/linh-vuc-nghien-cuu.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { LinhVucNghienCuu } from 'src/app/core/models/management/danh-muc/linh-vuc-nghien-cuu.model';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-form-linh-vuc-nghien-cuu',
  templateUrl: './form-linh-vuc-nghien-cuu.component.html',
  styleUrls: ['./form-linh-vuc-nghien-cuu.component.scss']
})
export class FormLinhVucNghienCuuComponent implements OnInit {

  @Input() modalData: ModalData<LinhVucNghienCuu>;
  @Input() totalElements: number;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;
  listLinhVucNghienCuu: Paginate<LinhVucNghienCuu> = new Paginate<LinhVucNghienCuu>();
  searchValue = '';

  constructor(
    private fbd: FormBuilder,
    private linhVucNghienCuuSvc: LinhVucNghienCuuService,
    private validatorSvc: ValidatorService,
    private alert: ToastrService,
  ) { }

  ngOnInit() {
    this.getAllDataPaging();
    // this.createForm();
  }

  createForm() {
    this.form = this.fbd.group({
      maLinhVuc: ['', [Validators.required]],
      tenLinhVuc: ['', [Validators.required]],
      tenLinhVucEn: ['', [Validators.required]],
      thuTu: [this.totalElements, [Validators.required]],
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        maLinhVuc: this.modalData.data.maLinhVuc,
        tenLinhVuc: this.modalData.data.tenLinhVuc,
        tenLinhVucEn: this.modalData.data.tenLinhVucEn,
        thuTu: this.modalData.data.thuTu
      });
    }
  }

  getAllDataPaging() {
    this.linhVucNghienCuuSvc.findAllPaging(0, 10, this.searchValue)
      .subscribe(res => {
        this.totalElements = res.totalElements + 1;
        this.createForm();
      });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.linhVucNghienCuuSvc.update(this.form.value, this.modalData.data.id)
          .subscribe(() => {
            this.returnData.emit(true);
            this.alert.success(MessageConstant[this.langCode].MSG_UPDATED_DONE);
          });
      } else {
        this.linhVucNghienCuuSvc.create(this.form.value)
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

