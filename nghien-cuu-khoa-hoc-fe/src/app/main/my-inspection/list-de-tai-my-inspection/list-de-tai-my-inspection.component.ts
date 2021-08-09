import { BieuMauService } from 'src/app/core/services/management/bieu-mau/bieu-mau.service';
import { HoiDongNghiemThuService } from 'src/app/core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { ThoiGianQuyTrinhService } from 'src/app/core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { HoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';

@Component({
  selector: 'app-list-de-tai-my-inspection',
  templateUrl: './list-de-tai-my-inspection.component.html',
  styleUrls: ['./list-de-tai-my-inspection.component.scss'
    , './../../../../assets/theme/css/main.css', '../../../../assets/theme/css/main.css']
})
export class ListDeTaiMyInspectionComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  breadcrumbObj: BreadCrumb = new BreadCrumb();

  regDeTai = true; // test => true
  regIndex = 0; // test thì set, prod phải để tự nhận dạng
  dataDeTai: DeTai;

  modalData = new ModalData<DeTai | string>();
  thoiGianQuyTrinhId = '';
  deTaiId = '';
  listThoiGianQuyTrinh: ThoiGianQuyTrinh[] = [];

  listTrangThaiDetai = SystemConstant.TRANG_THAI_DE_TAI_TITLE;


  // table
  loading = true;
  listDeTaiByChuNhiem: Paginate<DeTai> = new Paginate<DeTai>();
  listHoiDongNghiemThu: Paginate<HoiDongNghiemThu> = new Paginate<HoiDongNghiemThu>();
  searchValue = '';
  thoiGianQuyTrinhDeFault = '';

  searchValueTextChanged = new Subject<string>();
  searchValueTimelineTextChanged = new Subject<string>();

  constructor(
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService,
    private bieuMauSvc: BieuMauService,
  ) { }

  ngOnInit(): void {
    this.breadcrumbObj.heading = this.languageData[this.langCode].HOME_PAGE;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].HOME_PAGE,
        link: UrlConstant.ROUTE.MAIN.HOME
      }
    ];
    this.getAllThoiGianQuyTrinh();
    this.thoiGianQuyTrinhId = localStorage.getItem('thoiGianQuyTrinhId');
    if (this.thoiGianQuyTrinhId) {
      this.changeProgeressTimeLine(this.thoiGianQuyTrinhId);
    }
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getHoiDongNghiemThu(this.listThoiGianQuyTrinh[0].id, searchValue);
      });
    this.searchValueTimelineTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getAllThoiGianQuyTrinh(searchValue);
      });
  }

  checkGetDeTai(): void {
    if (this.thoiGianQuyTrinhId !== null && this.deTaiId !== null) {
      this.getHoiDongNghiemThu(this.thoiGianQuyTrinhId);
    }
  }

  getHoiDongNghiemThu(thoiGianQuyTrinhId?: string, searchValue?: string): void {
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuPagingByCNDT(
      thoiGianQuyTrinhId,
      SystemConstant.TRANG_THAI_HOI_DONG.DA_DUYET_THANH_VIEN,
      this.listHoiDongNghiemThu.currentPage - 1,
      this.listHoiDongNghiemThu.limit,
      searchValue
    ).subscribe(res => {
      this.listHoiDongNghiemThu.data = res.content;
      this.listHoiDongNghiemThu.currentPage = res.pageable.pageNumber + 1;
      this.listHoiDongNghiemThu.limit = res.pageable.pageSize;
      this.listHoiDongNghiemThu.totalPage = res.totalPages;
      this.listHoiDongNghiemThu.totalItem = res.totalElements;
    });
  }

  getThoiGianQuyTrinhActive() {
    this.thoiGianQuyTrinhSvc.getThoiGianQuyTrinhActive()
      .subscribe(res => {
        this.thoiGianQuyTrinhDeFault = res[0].id;
      });
  }

  getAllThoiGianQuyTrinh(search?: string): void {
    this.thoiGianQuyTrinhSvc.getAllPagingThoiGianQuyTrinh(0, 10, search)
      .subscribe(res => this.listThoiGianQuyTrinh = res.content);
  }

  onSearch(e) {
    if (e) {}
  }

  routerLinkToComponent(idHoiDong: string) {
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate(['/work/inspection', idHoiDong]);
      this.spinner.hide();
    }, 300);
  }

  pageChange(page: Paginate<HoiDongNghiemThu>) {
    this.listHoiDongNghiemThu = page;
    this.getHoiDongNghiemThu(this.thoiGianQuyTrinhId);
  }

  changeProgeressTimeLine(thoiGianQuyTrinhId) {
    localStorage.setItem('thoiGianQuyTrinhId', thoiGianQuyTrinhId);
    this.spinner.show();
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuPagingByCNDT(
      thoiGianQuyTrinhId,
      SystemConstant.TRANG_THAI_HOI_DONG.DA_DUYET_THANH_VIEN,
      this.listHoiDongNghiemThu.currentPage - 1,
      this.listHoiDongNghiemThu.limit
    ).subscribe(res => {
      this.listHoiDongNghiemThu.data = res.content;
      this.listHoiDongNghiemThu.currentPage = res.pageable.pageNumber + 1;
      this.listHoiDongNghiemThu.limit = res.pageable.pageSize;
      this.listHoiDongNghiemThu.totalPage = res.totalPages;
      this.listHoiDongNghiemThu.totalItem = res.totalElements;
      this.spinner.hide();
    });
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
          this.langCode === 'vi' ? `BM18T-bieu-mau-de-nghi-thanh-toan(${maSo}).docx` :
            `BM16T-form-payment-request(${maSo}).docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau19T(deTaiId: string, maSo: string) {
    this.spinner.show();
    this.bieuMauSvc.xuatBieuMauThanhLyHopDong(deTaiId)
      .subscribe(res => {
        this.convertFileFromBlob(res.body,
          this.langCode === 'vi' ? `BM19T-thanh-ly-hop-dong(${maSo}).docx` :
            `BM16T-form-contract-liquidation-minutes(${maSo}).docx`);
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
