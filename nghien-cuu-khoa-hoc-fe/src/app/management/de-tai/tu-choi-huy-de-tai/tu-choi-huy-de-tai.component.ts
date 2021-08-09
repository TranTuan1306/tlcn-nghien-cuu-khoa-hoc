import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { TuChoiHuyDeTai } from 'src/app/core/models/bieu-mau/bm09-don-xin-huy-de-tai.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DonXinHuyDeTaiService } from 'src/app/core/services/management/de-tai/don-xin-huy-de-tai.service';

@Component({
  selector: 'app-tu-choi-huy-de-tai',
  templateUrl: './tu-choi-huy-de-tai.component.html',
  styleUrls: ['./tu-choi-huy-de-tai.component.scss']
})
export class TuChoiHuyDeTaiComponent implements OnInit {

  @Input() modalData: ModalData<TuChoiHuyDeTai>;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;



  constructor(
    private fbd: FormBuilder,
    private alert: ToastrService,
    private tuChoiHuySvc: DonXinHuyDeTaiService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fbd.group({
      noiDungTuChoi: ['', [Validators.required]],
    });
  }

  themNoiDung() { }
  themSanPham() { }

  onSubmit() {
    if (this.form.valid) {
      this.tuChoiHuySvc.createTuChoiHuyDeTai(this.form.value)
        .subscribe(() => {
          this.returnData.emit(false);
          this.alert.success(this.languageData[this.langCode].MSG_CREATED_DONE);
        },
        () => {
          this.alert.error(this.languageData[this.langCode].MSG_ERR_SYSTEM);
        });
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
}
