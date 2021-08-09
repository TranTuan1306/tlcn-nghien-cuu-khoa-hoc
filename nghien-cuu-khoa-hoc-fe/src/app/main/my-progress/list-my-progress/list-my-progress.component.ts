import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
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

@Component({
  selector: 'app-list-my-progress',
  templateUrl: './list-my-progress.component.html',
  styleUrls: ['./list-my-progress.component.scss', '../../../../assets/theme/css/main.css', '../../../../assets/theme/css/main.css']
})
export class ListMyProgressComponent implements OnInit {

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
  searchValue = '';

  searchValueTextChanged = new Subject<string>();
  searchValueTimelineTextChanged = new Subject<string>();

  constructor(
    private deTaiSvc: DeTaiAdminService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.breadcrumbObj.heading = this.languageData[this.langCode].HOME_PAGE;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].HOME_PAGE,
        link: UrlConstant.ROUTE.MAIN.HOME
      }
    ];
    this.thoiGianQuyTrinhId = localStorage.getItem('thoiGianQuyTrinhId');
    if (this.thoiGianQuyTrinhId){
      this.changeProgeressTimeLine(this.thoiGianQuyTrinhId);
    }
    this.getAllThoiGianQuyTrinh();
    // this.getDeTaiByChuNhiem();
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getDeTaiByChuNhiem(this.listThoiGianQuyTrinh[0].id, searchValue);
      });
    this.searchValueTimelineTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getAllThoiGianQuyTrinh(searchValue);
      });
  }

  checkGetDeTai(): void {
    if (this.thoiGianQuyTrinhId !== null && this.deTaiId !== null) {
      this.getDeTaiByChuNhiem(this.thoiGianQuyTrinhId);
    }
  }

  getDeTaiByChuNhiem(thoiGianQuyTrinhId?: string, searchValue?: string): void {
    this.deTaiSvc.getDeTaiByChuNhiemVaStatus(
      thoiGianQuyTrinhId,
      [
        SystemConstant.TRANG_THAI_DE_TAI.KY_HOP_DONG,
        SystemConstant.TRANG_THAI_DE_TAI.XIN_HUY,
        SystemConstant.TRANG_THAI_DE_TAI.HUY
      ],
      this.listDeTaiByChuNhiem.currentPage - 1,
      this.listDeTaiByChuNhiem.limit,
      searchValue,
    )
      .subscribe(res => {
        this.loading = false;
        this.listDeTaiByChuNhiem.currentPage = res.pageable.pageNumber + 1;
        this.listDeTaiByChuNhiem.limit = res.pageable.pageSize;
        this.listDeTaiByChuNhiem.totalPage = res.totalPages;
        this.listDeTaiByChuNhiem.totalItem = res.totalElements;
        this.listDeTaiByChuNhiem.data = res.content;
      }, () => {
        this.listDeTaiByChuNhiem.data = [];
        this.loading = false;
      });
  }

  getAllThoiGianQuyTrinh(search?: string): void {
    this.thoiGianQuyTrinhSvc.getAllPagingThoiGianQuyTrinh(0, 10, search)
      .subscribe(res => this.listThoiGianQuyTrinh = res.content);
  }

  pageChange(page: Paginate<DeTai>): void {
    this.listDeTaiByChuNhiem = page;
    this.getDeTaiByChuNhiem(this.listThoiGianQuyTrinh[0].id);
  }

  onSearch(e) {
    if (e) {}
  }

  openModal() {

  }

  routerLinkToListProgressComponent(id: string) {
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate(['/work/my-progress/progress-reports', id]);
      this.spinner.hide();
    }, 200);
  }

  routerLinkToListCancelTopicComponent(id: string) {
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate(['/work/my-progress/requests-cancel-topic/', id]);
      this.spinner.hide();
    }, 200);
  }

  changeProgeressTimeLine(thoiGianQuyTrinhId) {
    localStorage.setItem('thoiGianQuyTrinhId', thoiGianQuyTrinhId);
    this.spinner.show();
    this.deTaiSvc.getDeTaiByChuNhiemVaStatus(
      thoiGianQuyTrinhId,
      [
        SystemConstant.TRANG_THAI_DE_TAI.KY_HOP_DONG,
        SystemConstant.TRANG_THAI_DE_TAI.XIN_HUY,
        SystemConstant.TRANG_THAI_DE_TAI.HUY
      ],
      this.listDeTaiByChuNhiem.currentPage - 1,
      this.listDeTaiByChuNhiem.limit,
      this.searchValue,)
      .subscribe(res => {
        this.listDeTaiByChuNhiem.currentPage = res.pageable.pageNumber + 1;
        this.listDeTaiByChuNhiem.limit = res.pageable.pageSize;
        this.listDeTaiByChuNhiem.totalPage = res.totalPages;
        this.listDeTaiByChuNhiem.totalItem = res.totalElements;
        this.listDeTaiByChuNhiem.data = res.content;
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau01(id: string) {
    this.spinner.show();
    this.deTaiSvc.exportBM01(id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body, `BM01T-bieu-mau-de-xuat-de-tai-${id}.docx`);
        this.spinner.hide();
      }, () => this.spinner.hide());
  }

  clickDownloadFileBieuMau02(id: string) {
    this.spinner.show();
    this.deTaiSvc.exportBM02(id)
      .subscribe(res => {
        this.convertFileFromBlob(res.body, `BM02T-bieu-mau-thuyet-minh-de-tai-${id}.docx`);
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

  confirmCancelProject(id: string) {
    this.deTaiSvc.huyDeTaiById(id)
      .subscribe(()=>{});
  }
}
