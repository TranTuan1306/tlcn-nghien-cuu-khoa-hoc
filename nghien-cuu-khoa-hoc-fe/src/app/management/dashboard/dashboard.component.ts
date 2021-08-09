import { Component, OnInit } from '@angular/core';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { LanguageConstant } from 'src/app/core/constants/language.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  danhMuc = [];
  cauHinh = [];
  hoiDong = [];
  deTai = [];

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  ngOnInit() {
    this.breadcrumbObj.heading = 'Tổng quan';
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DASHBOARD
      }
    ];

    this.danhMuc = [
      {
        title: this.languageData[this.langCode].ACADEMIC_RANK,
        routerLink: '/management/categories/academic-rank'
      },
      {
        title: this.languageData[this.langCode].DEGREE,
        routerLink: '/management/categories/degree'
      },
      {
        title: this.languageData[this.langCode].RESEARCH_DOMAIN,
        routerLink: '/management/categories/research-domain'
      },
      // {
      //   title: 'Địa điểm',
      //   routerLink: '/management/danh-muc/dia-diem'
      // },
      {
        title: this.languageData[this.langCode].EVALUTATION_SCORE,
        routerLink: '/management/danh-muc/bieu-diem-danh-gia'
      }
    ];

    this.cauHinh = [
      {
        title: this.languageData[this.langCode].REGISTRATION_TIME,
        routerLink: '/management/cau-hinh/thoi-gian-dang-ky'
      },
      {
        title: this.languageData[this.langCode].NOTIFICATION,
        routerLink: '/management/cau-hinh/thong-bao'
      },
      {
        title: 'Email',
        routerLink: '/management/cau-hinh/email'
      },
      {
        title: 'Độ tuổi giảng viên',
        routerLink: '/management/cau-hinh/do-tuoi-giang-vien'
      },
    ];

    this.hoiDong = [
      {
        title: 'Danh sách hội đồng',
        routerLink: '/management/hoi-dong/danh-sach'
      },
      {
        title: 'Thành viên hội đồng',
        routerLink: '/management/hoi-dong/thanh-vien'
      },
      {
        title: 'Chức vụ thành viên hội đồng',
        routerLink: '/management/hoi-dong/chuc-vu'
      },
    ];

    this.deTai = [
      {
        title: 'Danh sách đề tài',
        routerLink: '/management/de-tai'
      }
    ];
  }

}
