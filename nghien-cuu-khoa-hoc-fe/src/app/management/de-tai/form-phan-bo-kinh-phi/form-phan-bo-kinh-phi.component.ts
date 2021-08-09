import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';

@Component({
  selector: 'app-form-phan-bo-kinh-phi',
  templateUrl: './form-phan-bo-kinh-phi.component.html',
  styleUrls: ['./form-phan-bo-kinh-phi.component.scss']
})
export class FormPhanBoKinhPhiComponent implements OnInit {

  @Input() modalData: ModalData<DeTai>;
  @Output() modalReturn: EventEmitter<unknown> = new EventEmitter<unknown>();

  @ViewChild(NzInputDirective, { read: ElementRef }) inputElement: ElementRef;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  form: FormGroup;

  constructor(private fbd: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fbd.group({
      deTai: [this.modalData.data.id, Validators.required],
      kinhPhi: [0, Validators.required]
    });
  }

  onCancel() {
    console.log('modalReturn send false');
    this.modalReturn.emit(false);
  }

  onSubmit() {
    console.log('modalReturn send true');
    this.modalReturn.emit(true);
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
