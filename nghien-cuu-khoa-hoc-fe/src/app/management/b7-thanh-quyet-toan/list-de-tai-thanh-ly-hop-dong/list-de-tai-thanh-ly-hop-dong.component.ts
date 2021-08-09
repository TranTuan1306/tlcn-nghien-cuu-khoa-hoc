import { ThoiGianQuyTrinh } from 'src/app/core/models/management/cau-hinh/thoi-gian-quy-trinh.model';
import { ThoiGianQuyTrinhService } from 'src/app/core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-de-tai-thanh-ly-hop-dong',
  templateUrl: './list-de-tai-thanh-ly-hop-dong.component.html',
  styleUrls: ['./list-de-tai-thanh-ly-hop-dong.component.scss']
})
export class ListDeTaiThanhLyHopDongComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  listTrangThaiDetai = SystemConstant.TRANG_THAI_DE_TAI_TITLE[this.langCode];

  form: FormGroup;

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<DeTai> = new ModalData<DeTai>();

  //Search
  searchTimeProcessChanged = new Subject<string>();
  searchValueTextChanged = new Subject<string>();

  deTaiData: DeTai;
  currentTabData = 0;

  // table
  loadingTable = false;

  // chọn đề tài
  checked = false;
  indeterminate = false;
  listOfCurrentPageDeTai: [] = []; //model là đề tài đã được ký hợp đồng
  setOfCheckedId = new Set<string>();
  currentMaDuyetDeTai = '';

  thoiGianQuyTrinhDefault = '';
  listThoiGianQuyTrinh: ThoiGianQuyTrinh[] = [];

  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();

  searchValue = '';
  isShow = false;
  showSpin = false;
  fileToUpload: File = null;

  constructor(
    private fbd: FormBuilder,
    private deTaiSvc: DeTaiAdminService,
    private timeLineSvc: ThoiGianQuyTrinhService,
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].TOPIC_SETTLEMENT;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].TOPICS,
        link: UrlConstant.ROUTE.MANAGEMENT.THANH_QUYET_TOAN
      }
    ];
    this.createForm();
    this.currentMaDuyetDeTai = '';
    this.getAllThoiGianQuyTrinhPaging();
    this.getThoiGianQuyTrinhActive();
    this.searchTimeProcessChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getAllThoiGianQuyTrinhPaging(searchValue);
      });
    this.searchValueTextChanged.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getDeTaiByTrangThaiVaThoiGianQuyTrinh(this.thoiGianQuyTrinhDefault, searchValue);
      });
  }

  createForm() {
    this.form = this.fbd.group({
      filePayMentRequest: [null, [Validators.required]],
      fileEquipmentDeliveryRecord: [null, [Validators.required]],
      fileContractLiqudationMinues: [null, [Validators.required]],
    });
  }

  getAllThoiGianQuyTrinhPaging(searchValue?: string) {
    this.timeLineSvc.getAllPagingThoiGianQuyTrinh(0, 10, searchValue)
      .subscribe(res => {
        this.listThoiGianQuyTrinh = res.content;
      });
  }

  getThoiGianQuyTrinhActive() {
    this.timeLineSvc.getThoiGianQuyTrinhActive()
      .subscribe(res => {
        this.thoiGianQuyTrinhDefault = res[0].id;
        this.getDeTaiByTrangThaiVaThoiGianQuyTrinh(res[0].id);
      });
  }

  changeProcessTimeLine(thoiGianQuyTrinhId: string) {
    this.getDeTaiByTrangThaiVaThoiGianQuyTrinh(thoiGianQuyTrinhId);
  }

  getDeTaiByTrangThaiVaThoiGianQuyTrinh(thoiGianQuyTrinhId: string, searchValue?: string) {
    this.deTaiSvc.getDetaiByTimeLineAndStatus(
      thoiGianQuyTrinhId,
      [SystemConstant.TRANG_THAI_DE_TAI.DAT_NGHIEM_THU, SystemConstant.TRANG_THAI_DE_TAI.DA_THANH_LY],
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit,
      searchValue)
      .subscribe(res => {
        this.listDeTai.data = res.content;
        this.listDeTai.totalItem = res.totalElements;
        this.listDeTai.totalPage = res.totalPages;
        this.listDeTai.limit = res.pageable.pageSize;
      });
  }

  onSearch() {
    this.listDeTai.currentPage = 1;
  }

  pageChanged(page: Paginate<DeTai>) {
    this.listDeTai = page;
    this.getDeTaiByTrangThaiVaThoiGianQuyTrinh(this.thoiGianQuyTrinhDefault);
  }

  closeModal(status: boolean): void {
    if (status) {
      const idDeTai = this.listDeTai.data[this.listDeTai.data.findIndex(x => x.isShow)].id;
      this.listDeTai.data.map(x => x.isShow = false);
      this.isShow = false;
      this.getDeTaiByTrangThaiVaThoiGianQuyTrinhAfter(this.thoiGianQuyTrinhDefault, idDeTai);
    }
  }

  getDeTaiByTrangThaiVaThoiGianQuyTrinhAfter(thoiGianQuyTrinhId: string, idDeTai: string) {
    this.deTaiSvc.getDetaiByTimeLineAndStatus(
      thoiGianQuyTrinhId,
      [SystemConstant.TRANG_THAI_DE_TAI.DAT_NGHIEM_THU, SystemConstant.TRANG_THAI_DE_TAI.DA_THANH_LY],
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit)
      .subscribe(res => {
        this.toggleShow(res.content[res.content.findIndex( x=> x.id === idDeTai)], res.content.findIndex( x=> x.id === idDeTai));
        this.listDeTai.data = res.content;
        this.listDeTai.totalItem = res.totalElements;
        this.listDeTai.totalPage = res.totalPages;
        this.listDeTai.limit = res.pageable.pageSize;
      });
  }

  toggleShow(deTai: DeTai, index: number) {
    this.showSpin = true;
    this.deTaiData = deTai;
    setTimeout(() => {
      this.isShow = !this.isShow;
      this.listDeTai.data.map( x => x.isShow = false);
      this.listDeTai.data[index].isShow = true;
      this.showSpin = false;
    }, 200);
  }

  toggleHide(index: number) {
    this.listDeTai.data.map( x => x.isShow = false);
    this.listDeTai.data[index].isShow = false;
    this.isShow = !this.isShow;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  handleCurrentTab(currentTab: number) {
    this.currentTabData = currentTab;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string) {
    return (
      !this.form.get(field).valid && this.form.get(field).touched
    );
  }
}
