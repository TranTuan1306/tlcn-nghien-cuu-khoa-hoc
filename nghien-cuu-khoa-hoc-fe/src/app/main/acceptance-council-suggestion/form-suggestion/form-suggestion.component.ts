import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ValidatorService } from 'src/app/core/services/common/validator.service';

@Component({
  selector: 'app-form-suggestion',
  templateUrl: './form-suggestion.component.html',
  styleUrls: ['./form-suggestion.component.scss', '../../../../assets/theme/css/main.css']
})
export class FormSuggestionComponent implements OnInit {

  @Input() idTopic: string;
  @Output() closePopup: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  listThanhVien: unknown[] = [];

  form: FormGroup;
  listNhiemVuHoiDong = [
    { id: 'THANH_VIEN', tenNhiemVu: 'Thành viên', tenNhiemVuEn: 'Member' },
    { id: 'PHAN_BIEN_NGOAI_TRUONG', tenNhiemVu: 'Phản biện ngoài trường', tenNhiemVuEn: 'Internal reviewer' },
    { id: 'PHAN_BIEN_TRONG_TRUONG', tenNhiemVu: 'Phản biện trong trường', tenNhiemVuEn: 'Exnternal reviewer' },
  ];

  constructor(
    private fbd: FormBuilder,
    private validatorService: ValidatorService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fbd.group({
      hoTen: ['', [Validators.required]],
      hocHam: ['', [Validators.required]],
      hocVi: ['', [Validators.required]],
      chuyenMon: ['', [Validators.required]],
      donViCongTac: ['', [Validators.required]],
      nhiemVuHoiDong: ['', [Validators.required]],
      email: ['', [Validators.required]],
      soDienThoai: ['', [Validators.required]],
    });
  }

  onSave() {
    this.spinner.show();
    if (this.form.valid) {
      this.listThanhVien.push(this.form.value);
      this.form.reset();
      this.spinner.hide();
    } else {
      this.validatorService.validateAllFormFields(this.form);
      this.spinner.hide();
    }
  }

  onCancel() {
    this.form.reset();
  }

  displayFieldCss(field: string): { 'has-error': boolean; 'has-feedback': boolean } {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string): boolean {
    return (
      !this.form.get(field).valid && this.form.get(field).touched
    );
  }

}
