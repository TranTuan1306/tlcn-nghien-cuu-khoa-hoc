import { NgxSpinnerService } from 'ngx-spinner';
import { FileService } from 'src/app/core/services/common/file.service';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { VanBanBieuMau } from 'src/app/core/models/management/cau-hinh/van-ban-bieu-mau.model';
import { VanBanBieuMauService } from 'src/app/core/services/management/cau-hinh/van-ban-bieu-mau.service';
import { BannerHomeService } from './../../../core/services/management/danh-muc/banner.service';
import { BaiVietTheoChuyenMuc } from 'src/app/core/models/management/danh-muc/bai-viet-theo-chuyen-muc.model';
import { BaiVietTheoChuyenMucService } from 'src/app/core/services/management/danh-muc/bai-viet-theo-chuyen-muc.service';
import { ChuyenMucBaiViet } from 'src/app/core/models/management/danh-muc/chuyen-muc-bai-viet.model';
import { ChuyenMucBaiVietService } from 'src/app/core/services/management/danh-muc/chuyen-muc-bai-viet.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { HomeBanner } from 'src/app/core/models/management/danh-muc/banner-home.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @ViewChild('imgSlider', { static: false }) imgSlider: ElementRef;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  //////////////////////////////

  valueSearch = '';
  autoResizeBanner = { height: 'auto' };
  listChuyenMucBaiViet: ChuyenMucBaiViet[] = [];
  threeCategoryFirst: ChuyenMucBaiViet[] = [];
  threePostLatest: BaiVietTheoChuyenMuc[] = [];
  listBanner: HomeBanner[] = [];
  listVanBanBieuMau: VanBanBieuMau[] = [];

  constructor(
    private chuyenMucBaiVietSvc: ChuyenMucBaiVietService,
    private baiVietTheoChuyenMucSvc: BaiVietTheoChuyenMucService,
    private bannerSvc: BannerHomeService,
    private vanBanBieuMauSvc: VanBanBieuMauService,
    private fileSvc: FileService,
    private spinner: NgxSpinnerService
  ) { }

  @HostListener('window:resize', [])
  onResize() {
    this.autoResizeBanner = { height: this.imgSlider.nativeElement.offsetHeight + 'px' };
  }

  ngOnInit(): void {
    this.getAllBanner();
    this.getAllChuyenMucBaiViet();
    this.getThreeFirstCategory();
    this.getThreePostLatest();
    this.getAllVanBanBieuMau();
    for (let i = 1; i < 5; i++) {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 500 * i);
    }
  }

  getAllVanBanBieuMau() {
    this.vanBanBieuMauSvc.getAllPagingVanBanActive(0, 10)
      .subscribe(res => {
        this.listVanBanBieuMau = res.content;
      });
  }

  getAllBanner() {
    this.bannerSvc.getAllPagingBannerActive(0, 10)
      .subscribe(res => {
        this.listBanner = res.content.sort((a, b) => Number(a.thuTu) - Number(b.thuTu));
      });
  }

  getAllChuyenMucBaiViet() {
    this.chuyenMucBaiVietSvc.getAllPagingChuyenMucActive(
      0, 10
    ).subscribe(res => {
      this.listChuyenMucBaiViet = res.content;
    });
  }

  getThreePostLatest() {
    this.baiVietTheoChuyenMucSvc.getAllPagingBaiVietActive(0, 3)
      .subscribe(res => {
        this.threePostLatest = res.content;
      });
  }

  getThreeFirstCategory() {
    this.chuyenMucBaiVietSvc.getAllPagingChuyenMucActive(0, 3)
      .subscribe(res => {
        this.threeCategoryFirst = res.content;
        this.getThreePostOfCategory();
      });
  }

  getThreePostOfCategory() {
    this.threeCategoryFirst.map(x => ({
      id: x.id,
      maChuyenMuc: x.maChuyenMuc,
      tenChuyenMuc: x.tenChuyenMuc,
      tenChuyenMucEn: x.tenChuyenMucEn,
      trangThai: x.trangThai,
      baiViet: null,
    }));
    this.threeCategoryFirst.map((x, i) => {
      this.baiVietTheoChuyenMucSvc.getAllPagingBaiVietActiveTheoChuyenMuc(x.id, 0, 3)
        .subscribe(res => {
          this.threeCategoryFirst[i].baiViet = res.content;
        });
    });
  }

  handleIsoStringToDate(date: string) {
    return date.match(/([^T]+)/)[0].split('-').reverse().join('/');
  }

  handleFilePatch(fileId: string): string {
    return environment.serverUrl + '/rest/file/view/' + fileId;
  }

  downloadFormDocument(vanBanBieuMau: VanBanBieuMau) {
    this.spinner.show();
    this.fileSvc.downloadFile(vanBanBieuMau.fileDinhKem)
      .subscribe(res => {
        this.convertFileFromBlob(res.body, res.headers.get('filename'));
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


  handleNameVanBanBieuMau(vanBanBieuMau: VanBanBieuMau): string {
    return this.langCode === 'vi' ? SystemConstant
      .VAN_BAN_BIEU_MAU_TILE[this.langCode][SystemConstant.VAN_BAN_BIEU_MAU_TILE[this.langCode]
        .findIndex(x => x.id === vanBanBieuMau.loai)].title + ' - ' + vanBanBieuMau.tieuDe
      : SystemConstant.VAN_BAN_BIEU_MAU_TILE[this.langCode][SystemConstant.VAN_BAN_BIEU_MAU_TILE[this.langCode]
        .findIndex(x => x.id === vanBanBieuMau.loai)].title + ' - ' + vanBanBieuMau.tieuDeEn;
  }

}
