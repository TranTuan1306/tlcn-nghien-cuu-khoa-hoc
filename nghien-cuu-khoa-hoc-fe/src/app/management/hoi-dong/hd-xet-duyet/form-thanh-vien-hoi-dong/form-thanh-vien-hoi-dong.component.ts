import { SystemConstant } from './../../../../core/constants/system.constant';
import { NhanVienEd } from 'src/app/core/models/management/de-tai/nhan-vien-ed.model';
import { Component, Input, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { DeTai } from 'src/app/core/models/management/de-tai/de-tai.model';
import { HoiDongDuyetThuyetMinhGet } from 'src/app/core/models/management/hoi-dong/hoi-dong-duyet-thuyet-minh-get.model';
// import { DeTaiAdminService } from 'src/app/core/services/management/de-tai/de-tai-admin.service';
// import { HoiDongKiemDuyetService } from 'src/app/core/services/management/hoi-dong/hoi-dong-kiem-duyet.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';
import { LanguageConstant } from 'src/app/core/constants/language.constant';

@Component({
  selector: 'app-form-thanh-vien-hoi-dong',
  templateUrl: './form-thanh-vien-hoi-dong.component.html',
  styleUrls: ['./form-thanh-vien-hoi-dong.component.scss']
})
export class FormThanhVienHoiDongComponent implements OnInit {
  @Input() thanhVienHoiDongs: NhanVienEd[];
  // breadcrum
  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  //Param truyền vào modal
  idDeTai: string;
  idHoiDong: string;

  // table
  listThanhVienHoiDongView: HoiDongDuyetThuyetMinhGet[] = [];
  listHoiDongKiemDuyet: Paginate<HoiDongDuyetThuyetMinhGet> = new Paginate<HoiDongDuyetThuyetMinhGet>();
  listDeTai: Paginate<DeTai> = new Paginate<DeTai>();
  searchValue = '';
  searchValueHoiDongKiemDuyet = new Subject<string>();

  listChucVuHoiDong = SystemConstant.CHUC_VU_HOI_DONG_TITLE[this.langCode];

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].COUNCIL_MENBERS;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].COUNCIL_MENBERS,
        link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG
      }
    ];
  }
}
