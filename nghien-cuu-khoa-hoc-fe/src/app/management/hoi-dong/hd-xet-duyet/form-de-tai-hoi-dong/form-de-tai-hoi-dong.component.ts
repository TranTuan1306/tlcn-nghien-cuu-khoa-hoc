import { SystemConstant } from './../../../../core/constants/system.constant';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { HoiDongDuyetThuyetMinhGet } from 'src/app/core/models/management/hoi-dong/hoi-dong-duyet-thuyet-minh-get.model';
import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-form-de-tai-hoi-dong',
  templateUrl: './form-de-tai-hoi-dong.component.html',
  styleUrls: ['./form-de-tai-hoi-dong.component.scss']
})
export class FormDeTaiHoiDongComponent implements OnInit, OnChanges {

  @Input() hoiDong: HoiDongDuyetThuyetMinhGet;
  @Output() returnData: EventEmitter<boolean> = new EventEmitter();
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////
  trangThaiDetai = SystemConstant.TRANG_THAI_DE_TAI;
  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  //Param truyền vào modal
  idDeTai: string;
  idHoiDong: string;


  // modal ref
  modalRef: NzModalRef;
  modalDefaultWidth = 400;
  modalData: ModalData<DeTai> = new ModalData<DeTai>();

  // table
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();
  searchValue = '';
  searchValueDeTai = new Subject<string>();

  constructor(
    private deTaiAdminSvc: DeTaiAdminService
  ) { }

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].COUNCIL_TOPICS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].COUNCIL_TOPICS,
        link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG
      }
    ];
    this.getDeTaiByListId();
    this.searchValueDeTai.pipe(debounceTime(300))
      .subscribe(searchValue => {
        this.getDeTaiByListId(searchValue);
      });
  }
  ngOnChanges() {
    this.getDeTaiByListId();
  }

  onSearch() {
    this.listDeTai.currentPage = 1;
    this.getDeTaiByListId();
  }

  getDeTaiByListId(searchValue?: string) {
    this.deTaiAdminSvc.getDeTaiByListIdPaging(
      this.hoiDong.deTaiIds,
      this.listDeTai.currentPage - 1,
      this.listDeTai.limit,
      searchValue)
      .subscribe(res => {
        this.listDeTai.data = res.content;
        this.listDeTai.currentPage = res.pageable.pageNumber + 1;
        this.listDeTai.limit = res.pageable.pageSize;
        this.listDeTai.totalPage = res.totalPages;
        this.listDeTai.totalItem = res.totalElements;
      });
  }

  pageChanged(page: Paginate<DeTai>) {
    this.listDeTai = page;
    this.getDeTaiByListId();
  }
}
