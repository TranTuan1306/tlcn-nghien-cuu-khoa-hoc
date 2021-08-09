import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { TinTuc } from 'src/app/core/models/management/danh-muc/tin-tuc.model';
import { TrackingTinTucService } from 'src/app/core/services/common/tracking-tin-tuc.service';
import { TinTucService } from 'src/app/core/services/management/danh-muc/tin-tuc.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss', '../../../assets/theme/css/main.css']
})
export class NewsComponent implements OnInit {

  valueSearch = '';
  listTinTuc: Paginate<TinTuc> = new Paginate<TinTuc>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  flagTinTuc = false;

  tinTucId = null;

  constructor(
    // private modalService: BsModalService,
    private tinTucSvc: TinTucService,
    private spinner: NgxSpinnerService,
    private trackingIdTinTucSvc: TrackingTinTucService,
    private routerActive: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.onGetAllPaging();
    this.tinTucId = this.routerActive.snapshot.queryParamMap.get('tb');
    if (this.tinTucId) {
      let i = 0;
      const tmp = setInterval(() => {
        this.trackingIdTinTucSvc.setId(this.tinTucId);
        if (i++ > 3) { clearInterval(tmp); }
      }, 1000);
    }
  }

  onGetAllPaging(): void {
    this.spinner.show();
    this.listTinTuc.data = [];
    this.tinTucSvc.getAllPagingTinTuc(
      // {
      //   mode: SystemConstant.MODE.TRUOC,
      //   ngay: new Date().toISOString()
      // },
      this.listTinTuc.currentPage - 1,
      this.listTinTuc.limit,
      this.valueSearch)
      .subscribe(res => {
        if (!this.flagTinTuc) {
          this.trackingIdTinTucSvc.setId(res.content[0].id);
          this.flagTinTuc = true;
        }
        this.listTinTuc.data = res.content;
        this.listTinTuc.totalItem = res.totalElements;
        this.listTinTuc.totalPage = res.totalPages;
        this.listTinTuc.limit = res.pageable.pageSize;
        this.listTinTuc.currentPage = res.pageable.pageNumber + 1;
        this.spinner.hide();
      },
      () => {
        this.listTinTuc.data = [];
        this.spinner.hide();
      });
  }

  onSearch(): void {
    this.listTinTuc.currentPage = 1;
    this.onGetAllPaging();
  }

  setIdThongBao(id: string): void {
    this.trackingIdTinTucSvc.setId(id);
    this.router.navigateByUrl('/thong-bao?tb=' + id);
  }

}
