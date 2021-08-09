import { ThoiGianQuyTrinhService } from './../../../core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { HoiDongNghiemThuService } from './../../../core/services/management/hoi-dong/hoi-dong-nghiem-thu.service';
import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { HoiDongNghiemThu } from 'src/app/core/models/management/hoi-dong/hoi-dong-nghiem-thu.model';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';

@Component({
  selector: 'app-list-de-tai-nghiem-thu',
  templateUrl: './list-de-tai-nghiem-thu.component.html',
  styleUrls: ['./list-de-tai-nghiem-thu.component.scss']
})
export class ListDeTaiNghiemThuComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  listTrangThaiHoiDongTitle = SystemConstant.TRANG_THAI_HOI_DONG_TITLE[this.langCode];
  messageTooltipConstant = MessageTooltipConstant[this.langCode];

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalDataHoiDong: ModalData<HoiDongNghiemThu> = new ModalData<HoiDongNghiemThu>();
  modalDataBienBan: ModalData<HoiDongNghiemThu> = new ModalData<HoiDongNghiemThu>();
  listHoiDongNghiemThu: Paginate<HoiDongNghiemThu> = new Paginate<HoiDongNghiemThu>();

  // table
  loadingTable = true;

  // chọn đề tài
  checked = false;
  indeterminate = false;
  listOfCurrentPageDeTai: [] = []; //model là đề tài đã được ký hợp đồng
  setOfCheckedId = new Set<string>();
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();

  thoiGianQuyTrinhDefault = '';
  lazyLoadingTable = false;

  searchValue = '';
  isShow = false;
  indexToggleShowBottomForm = 0;
  showSpin = false;
  currentTab = 0;
  deTaiId = '';

  constructor(
    private hoiDongNghiemThuSvc: HoiDongNghiemThuService,
    private thoiGianQuyTrinhSvc: ThoiGianQuyTrinhService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].PERFORMING_PROGRESS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].TOPICS,
        link: UrlConstant.ROUTE.MANAGEMENT.NGHIEM_THU_DE_TAI
      }
    ];
    this.getThoiGianQuyTrinhActive();
  }

  getThoiGianQuyTrinhActive() {
    this.thoiGianQuyTrinhSvc.getThoiGianQuyTrinhActive()
      .subscribe(res => {
        this.thoiGianQuyTrinhDefault = res[0].id;
        this.getAllHoiDongNghiemThuPaging();
      });
  }

  onSearch() {
    this.listDeTai.currentPage = 1;
    this.getAllHoiDongNghiemThuPaging();
  }

  getAllHoiDongNghiemThuPaging() {
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuPaging(
      this.thoiGianQuyTrinhDefault,
      SystemConstant.TRANG_THAI_HOI_DONG.DA_DUYET_THANH_VIEN,
      this.listHoiDongNghiemThu.currentPage - 1,
      this.listHoiDongNghiemThu.limit,
      this.searchValue
    ).subscribe(res => {
      this.listHoiDongNghiemThu.data = res.content;
      this.listHoiDongNghiemThu.data.map(x => x.isShow = false);
      this.listHoiDongNghiemThu.totalItem = res.totalElements;
      this.listHoiDongNghiemThu.totalPage = res.totalPages;
      this.listHoiDongNghiemThu.limit = res.pageable.pageSize;
      this.lazyLoadingTable = false;
    });
  }


  pageChanged(page: Paginate<DeTai>) {
    this.listDeTai = page;
    this.getAllHoiDongNghiemThuPaging();
  }

  closeModal(status: boolean): void {
    this.isShow = false;
    if (status) {
      this.getAllHoiDongNghiemThuPagingAfterChildComponentChange();
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  // choose de tai
  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageDeTai;
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  toggleShow(data: HoiDongNghiemThu, index: number) {
    this.isShow = false;
    this.showSpin = true;
    this.modalDataHoiDong.data = data;
    this.modalDataBienBan.data = data;
    this.deTaiId = data.deTai.id;
    setTimeout(() => {
      this.indexToggleShowBottomForm = index;
      this.listHoiDongNghiemThu.data.map(x => x.isShow = false);
      this.listHoiDongNghiemThu.data[index].isShow = true;
      this.showSpin = false;
      this.isShow = true;
    }, 300);
  }

  getAllHoiDongNghiemThuPagingAfterChildComponentChange() {
    this.hoiDongNghiemThuSvc.getHoiDongNghiemThuPaging(
      this.thoiGianQuyTrinhDefault,
      SystemConstant.TRANG_THAI_HOI_DONG.DA_DUYET_THANH_VIEN,
      this.listHoiDongNghiemThu.currentPage - 1,
      this.listHoiDongNghiemThu.limit,
      this.searchValue
    ).subscribe(res => {
      this.listHoiDongNghiemThu.data = res.content;
      this.modalDataHoiDong.data = res.content[this.indexToggleShowBottomForm];
      this.modalDataBienBan.data = res.content[this.indexToggleShowBottomForm];
      this.toggleShow(this.listHoiDongNghiemThu.data[this.indexToggleShowBottomForm], this.indexToggleShowBottomForm);
      this.listHoiDongNghiemThu.data.map(x => x.isShow = false);
      this.listHoiDongNghiemThu.totalItem = res.totalElements;
      this.listHoiDongNghiemThu.totalPage = res.totalPages;
      this.listHoiDongNghiemThu.limit = res.pageable.pageSize;
      this.lazyLoadingTable = false;
    });
  }

  toggleHide(index: number) {
    this.isShow = false;
    this.currentTab = 0;
    this.listHoiDongNghiemThu.data.map(x => x.isShow = false);
    this.indexToggleShowBottomForm = index;
    this.listHoiDongNghiemThu.data[index].isShow = false;
  }

  handleCurrentTab(tab: number) {
    this.currentTab = tab;
  }

  handleTileBanDiem() {
    return this.langCode === 'vi' ? (this.languageData[this.langCode].COUNCIL_SCOREBOARD + ' và '
      + this.languageData[this.langCode].REVIEWERS_COMMENTS.toLowerCase()) :
      (this.languageData[this.langCode].COUNCIL_SCOREBOARD + ' and ' + this.languageData[this.langCode].REVIEWERS_COMMENTS.toLowerCase());
  }
}
