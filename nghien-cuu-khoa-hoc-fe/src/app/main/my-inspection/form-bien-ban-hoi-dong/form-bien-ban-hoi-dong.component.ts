import { HoiDongNghiemThu } from './../../../core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
import { FileControllerService } from 'src/app/core/services/common/file-controller.service';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-form-bien-ban-hoi-dong',
  templateUrl: './form-bien-ban-hoi-dong.component.html',
  styleUrls: ['./form-bien-ban-hoi-dong.component.scss']
})
export class FormBienBanHoiDongComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // Upload file /////////////////////////////////////////
  // eslint-disable-next-line @typescript-eslint/member-ordering
  setListIdFileToForm = this.fileSvc.setListIdFileToForm;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  setIdFileToForm = this.fileSvc.setIdFileToForm;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  extractFileFromListId = this.fileSvc.extractFileFromListId;

  // End Upload file //////////////////////////////////////


  form: FormGroup;
  currentMaDuyetDeTai = '';
  tableLoading = false;
  hoiDongNghiemThuDaTa: HoiDongNghiemThu;



  listFileDinhKem: { id: string; fileInfo: FileInfo }[] = [];
  viewModalRef: NzModalRef;
  selectedFileIdForView = '';
  constructor(
    private fbd: FormBuilder,
    private fileSvc: FileControllerService,
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService,
    private activatedRouterSvc: ActivatedRoute,
    private nzModalSvc: NzModalService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  getHoiDOngNghiemThuByIdHoiDong() {
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuById(this.activatedRouterSvc.snapshot.params.id)
      .subscribe(res => {
        this.hoiDongNghiemThuDaTa = res;
        this.currentMaDuyetDeTai = res.deTai.id;
        this.patchValue();
      });
  }

  createForm() {
    this.form = this.fbd.group({
      diemTrungBinhCuoi: ['', [Validators.required]],
      fileBienBanHoiDong: [null, [Validators.required]]
    });
    this.getHoiDOngNghiemThuByIdHoiDong();
  }

  patchValue() {
    this.form.patchValue({
      diemTrungBinhCuoi: this.hoiDongNghiemThuDaTa.diemTrungBinhCuoi,
      fileBienBanHoiDong: this.hoiDongNghiemThuDaTa.fileBienBanHoiDong
    });
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

  showFileName(idFile: string): string {
    const file = this.listFileDinhKem.find(x => x.id === idFile);
    return file ? file.fileInfo.tenFile : 'File không tồn tại';
  }

  openModalViewFile(template: TemplateRef<unknown>, fileId: string): void {
    this.selectedFileIdForView = fileId;
    this.viewModalRef = this.nzModalSvc.create({
      nzWidth: 1000,
      nzTitle: this.langCode === 'vi' ? 'Xem file' : 'View file',
      nzMaskClosable: false,
      nzContent: template,
      nzOnOk: () => this.viewModalRef.close(),
      nzCancelText: null
    });
  }
}
