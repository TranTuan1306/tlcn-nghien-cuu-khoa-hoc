import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { VanBanBieuMau } from 'src/app/core/models/management/cau-hinh/van-ban-bieu-mau.model';
import { BaiVietTheoChuyenMuc } from 'src/app/core/models/management/danh-muc/bai-viet-theo-chuyen-muc.model';
import { HomeBanner } from 'src/app/core/models/management/danh-muc/banner-home.model';
import { ChuyenMucBaiViet } from 'src/app/core/models/management/danh-muc/chuyen-muc-bai-viet.model';
import { FileService } from 'src/app/core/services/common/file.service';
import { VanBanBieuMauService } from 'src/app/core/services/management/cau-hinh/van-ban-bieu-mau.service';
import { BaiVietTheoChuyenMucService } from 'src/app/core/services/management/danh-muc/bai-viet-theo-chuyen-muc.service';
import { BannerHomeService } from 'src/app/core/services/management/danh-muc/banner.service';
import { ChuyenMucBaiVietService } from 'src/app/core/services/management/danh-muc/chuyen-muc-bai-viet.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss', '../home-demo.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  @ViewChild('imgSlider', { static: false }) imgSlider: ElementRef;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  //////////////////////////////

  valueSearch = '';
  autoResizeBanner = { height: 'auto' };
  listChuyenMucBaiViet: ChuyenMucBaiViet[] = [];
  threeCategoryFirst: ChuyenMucBaiViet[] = [];
  fourPostLatest: BaiVietTheoChuyenMuc[] = [];
  listBanner: HomeBanner[] = [];
  listVanBanBieuMau: VanBanBieuMau[] = [];

  sliderInterval;

  //nz-drawer
  visible = false;

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
    this.getFourPostLatest();
    this.getAllVanBanBieuMau();
    this.sliderInterval = setInterval(() =>
      window.dispatchEvent(new Event('resize')), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.sliderInterval);
  }

  handleFilePatch(fileId: string): string {
    return environment.serverUrl + '/rest/file/view/' + fileId;
  }

  getAllVanBanBieuMau() {
    this.vanBanBieuMauSvc.getAllPagingVanBanActive(0, 5)
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
      0, 15
    ).subscribe(res => {
      this.listChuyenMucBaiViet = res.content;
    });
  }

  getFourPostLatest() {
    this.baiVietTheoChuyenMucSvc.getAllPagingBaiVietActive(0, 4)
      .subscribe(res => {
        this.fourPostLatest = res.content;
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
      this.baiVietTheoChuyenMucSvc.getAllPagingBaiVietActiveTheoChuyenMuc(x.id, 0, 10)
        .subscribe(res => {
          this.threeCategoryFirst[i].baiViet = res.content;
        });
    });
  }

  handleIsoStringToDate(date: string) {
    return date.match(/([^T]+)/)[0].split('-').reverse().join('/');
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

  closeDrawer() {
    this.visible = false;
  }

  openDrawer() {
    this.visible = true;
  }

}
