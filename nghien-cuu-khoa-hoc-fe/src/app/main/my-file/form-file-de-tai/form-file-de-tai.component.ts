import { ActivatedRoute } from '@angular/router';
import { DeTaiAdminService } from './../../../core/services/management/de-tai/de-tai-admin.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { BieuMauService } from 'src/app/core/services/management/bieu-mau/bieu-mau.service';
@Component({
  selector: 'app-form-file-de-tai',
  templateUrl: './form-file-de-tai.component.html',
  styleUrls: ['./form-file-de-tai.component.scss']
})
export class FormFileDeTaiComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  listFileDinhKem: { id: string; fileInfo: FileInfo }[] = [];
  fileViewId = '';
  deTaiData: DeTai;

  constructor(
    // private fileSvc: FileControllerService,
    private nzModalSvc: NzModalService,
    private bieuMauSvc: BieuMauService,
    private spinner: NgxSpinnerService,
    private deTaiSvc: DeTaiAdminService,
    private activatedRouterSvc: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getDeTaiById();
  }

  getDeTaiById() {
    this.deTaiSvc.getDeTaiById(this.activatedRouterSvc.snapshot.params.id)
      .subscribe(res => {
        this.deTaiData = res;
      });
  }

  openModalViewFile(idFile: string, template: TemplateRef<void>, width?: number): void {
    this.fileViewId = idFile;
    this.nzModalSvc.create({
      nzTitle: null,
      nzStyle: { top: '20px', width: width ? `${width}px` : '750px' },
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  hideModalViewFile(): void {
    this.nzModalSvc.closeAll();
  }

  clickDownloadFileBieuMau1(deTaiId: string, maSo: string) {
    this.spinner.show();
    this.bieuMauSvc.exportBM01(deTaiId)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM01T-de-xuat-de-tai(${maSo}).docx` :
            `BM01T-recommended-topic(${maSo}).docx`
        );
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau2(deTaiId: string, maSo: string) {
    this.spinner.show();
    this.bieuMauSvc.exportBM02(deTaiId)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM02T-thuyet-minh-de-tai(${maSo}).docx` :
            `BM02T-explanations-topic(${maSo}).docx`
        );
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau6(deTaiId: string, maSo: string) {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauBoSungThuyetMinhDetai(deTaiId)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM06T-bo-sung-thuyet-minh-de-tai(${maSo}).docx` :
            `BM06T-additional-explanations(${maSo}).docx`
        );
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau7(deTaiId: string, maSo: string) {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauBaoCaoTinhHinhthucHienDeTai(deTaiId)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM07T-bao-cao-tinh-hinh-thuc-hien-de-tai(${maSo}).docx` :
            `BM07T-the-implementation-topic(${maSo}).docx`
        );
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau10And11(deTaiId: string, maSo: string) {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauKiemTraThongTinKetQuaNghienCuu(deTaiId)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM10T-BM11T-thong-tin-ket-qua-nghien-cuu(${maSo}).docx` :
            `BM10T-BM11T-research-results(${maSo}).docx`
        );
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau16T(deTaiId: string, maSo: string) {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauGiaiTrinhChinhSua(deTaiId)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM16T-bieu-mau-giai-trinh-chinh-sua(${maSo}).docx` :
            `BM16T-form-edit-explanation-form(${maSo}).docx`
        );
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau17T(deTaiId: string, maSo: string) {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauBanGiaoThietBi(deTaiId)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM17T-bieu-mau-ban-giao-thiet-bi(${maSo}).docx` :
            `BM17T-form-equipment-delivery-record(${maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau18T(deTaiId: string, maSo: string) {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauDeNghiThanhToan(deTaiId)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM16T-bieu-mau-de-nghi-thanh-toan(${maSo}).docx` :
            `BM18T-form-payment-request(${maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau19T(deTaiId: string, maSo: string) {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauThanhLyHopDong(deTaiId)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM16T-thanh-ly-hop-dong(${maSo}).docx` :
            `BM19T-form-contract-liquidation-minutes(${maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  convertFileFromBlob(data: Blob, fileName: string) {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }


}
