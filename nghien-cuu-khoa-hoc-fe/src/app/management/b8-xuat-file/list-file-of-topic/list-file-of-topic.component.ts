import { HoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { BienBanHoiDongThuyetMinhGet } from './../../../core/models/management/hoi-dong/bien-ban-hoi-dong-tm-get.model';
import { BienBanHoiDongThuyetMinhService } from './../../../core/services/management/hoi-dong/bien-ban-hoi-dong-thuyet-minh.service';
import { BieuMauService } from './../../../core/services/management/bieu-mau/bieu-mau.service';
import { DonXinHuy } from 'src/app/core/models/management/de-tai/don-xin-huy.model';
import { FileService } from 'src/app/core/services/common/file.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-file-of-topic',
  templateUrl: './list-file-of-topic.component.html',
  styleUrls: ['./list-file-of-topic.component.scss']
})
export class ListFileOfTopicComponent implements OnInit {

  @Input() dataDeTai: DeTai;
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;

  dateUploadFile = '';

  fileBanGiaoThietBis: FileInfo[];
  donXinHuys: DonXinHuy[];
  fileBienBanKiemTraThucHiens: FileInfo[];
  fileBoSungThuyetMinhs: FileInfo[];
  fileDeNghiThanhToans: FileInfo[];
  fileGiaiTrinhChinhSuas: FileInfo[];
  fileKyHopDongs: FileInfo[];
  fileThanhLyHopDongs: FileInfo[];
  bienBanHoiDongThuyetMinhGet: BienBanHoiDongThuyetMinhGet;
  dataHoiDongNghiemThu: HoiDongNghiemThu;

  selectedFileIdForView = '';

  //authen
  constructor(
    private fileSvc: FileService,
    private modalService: NzModalService,
    private spinner: NgxSpinnerService,
    private bieuMauSvc: BieuMauService,
    private bienBanhoiDongThuyetMinhSvc: BienBanHoiDongThuyetMinhService,
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService,
  ) { }

  ngOnInit(): void {
    this.getHoiDongNghiemThuByIdDeTai();
    this.getBienBanHoiDongThuyetMinh();
  }

  getHoiDongNghiemThuByIdDeTai() {
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuByDeTai(this.dataDeTai.id)
      .subscribe(res => {
        this.dataHoiDongNghiemThu = res;
      });
  }

  getBienBanHoiDongThuyetMinh() {
    this.bienBanhoiDongThuyetMinhSvc.getBienBanHoiDongXetDuyetByIdDeTai(this.dataDeTai.id)
      .subscribe(res => {
        this.bienBanHoiDongThuyetMinhGet = res;
      });
  }

  clickDownloadFileBieuMau01() {
    this.spinner.show();
    this.bieuMauSvc.exportBM01(this.dataDeTai.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM01T-de-xuat-de-tai(${this.dataDeTai.id}).docx` :
            `BM01T-recommended-topic(${this.dataDeTai.id}).docx`
        );
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau02() {
    this.spinner.show();
    this.bieuMauSvc.exportBM02(this.dataDeTai.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM02T-thuyet-minh-de-tai(${this.dataDeTai.id}).docx` :
            `BM02T-explanations-topic(${this.dataDeTai.id}).docx`
        );
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau03() {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauDanhGiaThuyetMinh(this.dataDeTai.id, this.bienBanHoiDongThuyetMinhGet.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM03T-phieu-danh-gia-thuyet-minh-de-tai(${this.dataDeTai.id}).docx` :
            `BM03T-assessment-sheet-of-topic-explanation(${this.dataDeTai.id}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau04() {
    this.spinner.show();
    this.bieuMauSvc.xuatBienBanHoiDongTuyenChon(this.bienBanHoiDongThuyetMinhGet.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM04T-bien-ban-hopj-hoi-dong-tuyen-chon-to-chuc-ca-nhan(${this.dataDeTai.id}).docx` :
            `BM04T-minutes-of-the-selection-committee-meeting(${this.dataDeTai.id}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau05() {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauHopDongThucHienDeTai(this.dataDeTai.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM05T-hop-dong-thuc-hien-de-tai(${this.dataDeTai.maSo}).docx` :
            `BM05T-contract-for-the-implementation-of-the-topic(${this.dataDeTai.maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau06() {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauBoSungThuyetMinhDetai(this.dataDeTai.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM06T-bo-sung-thuyet-minh-de-tai(${this.dataDeTai.maSo}).docx` :
            `BM06T-additional-explanation-topic(${this.dataDeTai.maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau07() {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauBaoCaoTinhHinhthucHienDeTai(this.dataDeTai.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM07T-bao-cao-tinh-hinh-thuc-hien(${this.dataDeTai.maSo}).docx` :
            `BM07T-implementation-status-report(${this.dataDeTai.maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau08() {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauKiemTraTinhHinhThucHienDetai(this.dataDeTai.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM08T-bien-ban-kiem-tra-tinh-hinh-thuc-hien-de-tai(${this.dataDeTai.maSo}).docx` :
            `BM08T-minutes-of-checking-the-implementation-of-the-topic(${this.dataDeTai.maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau10BieuMau11() {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauKiemTraThongTinKetQuaNghienCuu(this.dataDeTai.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM10T-BM11T-thong-tin-ket-qua-nghien-cuu(${this.dataDeTai.maSo}).docx` :
            `BM10T-BM11T-information on research results(${this.dataDeTai.maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau12() {
    this.spinner.show();
    this.hoiDongNghiemThuSvc.exportDanhSachDeXuat(this.dataHoiDongNghiemThu.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ?
            `BM12T-danh-sach-gioi-thieu-thanh-vien-hoi-dong-nghiem-thu-de-tai-
            ma-so(${this.dataDeTai.maSo})-ten-hoi-dong(${this.dataHoiDongNghiemThu.tenHoiDong}).docx` :
            `BM12T-list-of-accepted-acceptance-committee-members-introduced-
            ma-so-(${this.dataDeTai.maSo})-council-name(${this.dataHoiDongNghiemThu.tenHoiDong}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau13() {
    this.spinner.show();
    this.hoiDongNghiemThuSvc.exportPhieuDanhGiaNghiemThu(this.dataHoiDongNghiemThu.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ?
            `BM13T-phieu-danh-gia-nghiem-thu-de-tai-
            ma-so-(${this.dataDeTai.maSo})-ten-hoi-dong-(${this.dataHoiDongNghiemThu.tenHoiDong}).docx` :
            `BM13T-assessment-sheet-for-acceptance-of-the-topic-
            code-(${this.dataDeTai.maSo})-council-name(${this.dataHoiDongNghiemThu.tenHoiDong}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau14() {
    this.spinner.show();
    this.hoiDongNghiemThuSvc.exportBienBanHopHoiDongNghiemThu(this.dataHoiDongNghiemThu.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ?
            `BM14T-bien-ban-hop-hoi-dong-danh-gia-nghiem-thu-
            ma-so-(${this.dataDeTai.maSo})-ten-hoi-dong-(${this.dataHoiDongNghiemThu.tenHoiDong}).docx` :
            `BM14T-minutes-of-the-meeting-of-the-assessment-and-acceptance-council-
            code-(${this.dataDeTai.maSo})-council-name(${this.dataHoiDongNghiemThu.tenHoiDong}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau15() {
    this.spinner.show();
    this.hoiDongNghiemThuSvc.exportPhieuNhanXetPhanBien(this.dataHoiDongNghiemThu.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ?
            `BM15T-phieu-nhan-xet-phan-bien-
            ma-so-(${this.dataDeTai.maSo})-ten-hoi-dong-(${this.dataHoiDongNghiemThu.tenHoiDong}).docx` :
            `BM15T-comments-and-feedback-sheets-
            code-(${this.dataDeTai.maSo})-council-name(${this.dataHoiDongNghiemThu.tenHoiDong}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau16() {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauGiaiTrinhChinhSua(this.dataDeTai.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM16T-bieu-mau-giai-trinh-chinh-sua(${this.dataDeTai.maSo}).docx` :
            `BM16T-form-edit-explanation-form(${this.dataDeTai.maSo}).docx`
        );
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau17() {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauBanGiaoThietBi(this.dataDeTai.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM17T-bieu-mau-ban-giao-thiet-bi(${this.dataDeTai.maSo}).docx` :
            `BM17T-form-equipment-delivery-record(${this.dataDeTai.maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau18() {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauDeNghiThanhToan(this.dataDeTai.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM16T-bieu-mau-de-nghi-thanh-toan(${this.dataDeTai.maSo}).docx` :
            `BM18T-form-payment-request(${this.dataDeTai.maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau19() {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauThanhLyHopDong(this.dataDeTai.id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM16T-thanh-ly-hop-dong(${this.dataDeTai.maSo}).docx` :
            `BM19T-form-contract-liquidation-minutes(${this.dataDeTai.maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  downloadFile(fileId: string, name: string, filePatch: string) {
    name = name + '.' + filePatch.split('.').pop();
    this.spinner.show();
    this.fileSvc.downloadFile(fileId).subscribe(res => {
      this.convertFileFromBlob(res.body, name);
      this.spinner.hide();
    });
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

  viewFileModal(template: TemplateRef<unknown>, fileId: string, modalWidth: number) {
    this.selectedFileIdForView = fileId;
    this.modalRef = this.modalService.create({
      nzWidth: modalWidth,
      nzTitle: this.langCode === 'vi' ? 'Xem file' : 'View file',
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false,
      nzOnOk: () => this.modalRef.close(),
      nzClosable: true,
    });
  }
}
