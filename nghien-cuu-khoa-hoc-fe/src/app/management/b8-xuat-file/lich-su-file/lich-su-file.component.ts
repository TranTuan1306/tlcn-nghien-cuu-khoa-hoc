import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import moment from 'moment';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { FileInfo } from 'src/app/core/models/common/file-controller.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { DonXinHuy } from 'src/app/core/models/management/de-tai/don-xin-huy.model';
import { FileService } from 'src/app/core/services/common/file.service';

@Component({
  selector: 'app-lich-su-file',
  templateUrl: './lich-su-file.component.html',
  styleUrls: ['./lich-su-file.component.scss']
})
export class LichSuFileComponent implements OnInit {

  @Input() dataTable: DeTai;
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


  selectedFileIdForView = '';
  constructor(
    private fileSvc: FileService,
    private modalService: NzModalService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.mapValue();
  }

  mapValue() {
    this.donXinHuys = this.dataTable.donXinHuys.map(x => ({
      fileDonXinHuys: x.fileDonXinHuys,
      fileDonXinHuyShows: [],
      lyDo: x.lyDo,
      soTienDaTamUng: x.soTienDaTamUng,
      thoiGianTamUng: x.thoiGianTamUng,
      thoiGianXinHuy: x.thoiGianXinHuy
    }));

    this.fileBoSungThuyetMinhs = this.dataTable.fileBoSungThuyetMinhs.map(x => ({
      filePath: '',
      fileType: '',
      id: x,
      ngayUpload: '',
      tenFile: '',
    }));

    this.fileKyHopDongs = this.dataTable.fileKyHopDongs.map(x => ({
      filePath: '',
      fileType: '',
      id: x,
      ngayUpload: '',
      tenFile: '',
    }));

    this.fileGiaiTrinhChinhSuas = this.dataTable.fileGiaiTrinhChinhSuas.map(x => ({
      filePath: '',
      fileType: '',
      id: x,
      ngayUpload: '',
      tenFile: '',
    }));

    this.fileBienBanKiemTraThucHiens = this.dataTable.fileBienBanKiemTraThucHiens.map(x => ({
      filePath: '',
      fileType: '',
      id: x,
      ngayUpload: '',
      tenFile: '',
    }));


    this.fileBanGiaoThietBis = this.dataTable.fileBanGiaoThietBis.map(x => ({
      filePath: '',
      fileType: '',
      id: x,
      ngayUpload: '',
      tenFile: '',
    }));

    this.fileThanhLyHopDongs = this.dataTable.fileThanhLyHopDongs.map(x => ({
      filePath: '',
      fileType: '',
      id: x,
      ngayUpload: '',
      tenFile: '',
    }));

    this.fileDeNghiThanhToans = this.dataTable.fileDeNghiThanhToans.map(x => ({
      filePath: '',
      fileType: '',
      id: x,
      ngayUpload: '',
      tenFile: '',
    }));


    this.patchDate();
  }

  patchDate() {
    this.dataTable.donXinHuys.map((x, i) => {
      x.fileDonXinHuys.map(y => {
        this.fileSvc.getFileInfo(y)
          .subscribe(res => {
            this.donXinHuys[i].fileDonXinHuyShows.push(res);
          });
      });
    });

    this.dataTable.fileBoSungThuyetMinhs.map((x, i) => {
      this.fileSvc.getFileInfo(x)
        .subscribe(res => {
          this.fileBoSungThuyetMinhs[i] = res;
        });
    });

    this.dataTable.fileKyHopDongs.map((x, i)=> {
      this.fileSvc.getFileInfo(x)
        .subscribe(res => {
          this.fileKyHopDongs[i] = res;
        });
    });

    this.dataTable.fileGiaiTrinhChinhSuas.map((x, i) => {
      this.fileSvc.getFileInfo(x)
        .subscribe(res => {
          this.fileGiaiTrinhChinhSuas[i] = res;
        });
    });

    this.dataTable.fileBienBanKiemTraThucHiens.map((x, i) => {
      this.fileSvc.getFileInfo(x)
        .subscribe(res => {
          this.fileBienBanKiemTraThucHiens[i] = res;
        });
    });

    this.dataTable.fileBanGiaoThietBis.map((x, i) => {
      this.fileSvc.getFileInfo(x)
        .subscribe(res => {
          this.fileBanGiaoThietBis[i] = res;
        });
    });

    this.dataTable.fileThanhLyHopDongs.map((x, i) => {
      this.fileSvc.getFileInfo(x)
        .subscribe(res => {
          this.fileThanhLyHopDongs[i] = res;
        });
    });

    this.dataTable.fileDeNghiThanhToans.map((x, i) => {
      this.fileSvc.getFileInfo(x)
        .subscribe(res => {
          this.fileDeNghiThanhToans[i] = res;
        });
    });
  }

  handleDateApiFile(dateString: string) {
    const date = moment.utc(dateString).local();
    return date.format('DD/MM/YYYY HH:mm:ss');
  }

  handleTitle(content: string): string {
    return 'File' + ' ' + content.toLowerCase();
  }

  handleIndex(index: number) {
    if (index === 1) {
      return this.langCode === 'vi' ? 'Lần 1' : '1st';
    } else if (index === 2) {
      return this.langCode === 'vi' ? 'Lần 2' : '2nd';
    } else if (index === 3) {
      return this.langCode === 'vi' ? 'Lần 3' : '3rd';
    } else {
      return this.langCode === 'vi' ? 'Lần ' + index : index + 'th';
    }
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
