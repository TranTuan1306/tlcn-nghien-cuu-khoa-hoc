import { SystemConstant } from 'src/app/core/constants/system.constant';
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
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  danhMuc = [];
  cauHinh = [];
  khac = [];
  congViecTDV = [];

  authenPanel = null;

  // breadcrum
  breadcrumbObj: BreadCrumb = new BreadCrumb();

  ngOnInit() {
    this.breadcrumbObj.heading = this.languageData[this.langCode].DASHBOARD;
    this.breadcrumbObj.lstBreadcrumb = [
      {
        title: this.languageData[this.langCode].CATEGORIES,
        link: UrlConstant.ROUTE.MANAGEMENT.DASHBOARD
      }
    ];
    if (JSON.parse(localStorage.getItem(SystemConstant.CURRENT_ROLE_USER)).role === 'ROLE_ADMIN') {
      this.authenPanel = true;
    } else {
      this.authenPanel = false;
    }

    this.danhMuc = [
      {
        title: this.languageData[this.langCode].BANNER_HOME,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.BANNER,
      },
      {
        title: this.languageData[this.langCode].CATEGORIES_ARTICLES,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.CHUYEN_MUC_BAI_VIET,
      },
      {
        title: this.languageData[this.langCode].ARTICLES,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.BAI_VIET_THEO_CHUYEN_MUC,
      },
      {
        title: this.languageData[this.langCode].ACADEMIC_RANK,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.HOC_HAM,
      },
      {
        title: this.languageData[this.langCode].DEGREE,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.HOC_VI,
      },
      {
        title: this.languageData[this.langCode].RESEARCH_DOMAIN,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.LINH_VUC_NGHIEN_CUU,
      },
      {
        title: this.languageData[this.langCode].RESEARCH_TYPE,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.LOAI_HINH_NGHIEN_CUU,
      },
      {
        title: this.languageData[this.langCode].PRODUCT,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.SAN_PHAM,
      },
      {
        title: this.languageData[this.langCode].EXPENSE_TYPE,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.LOAI_KINH_PHI,
      },
    ];

    this.cauHinh = [
      {
        title: this.languageData[this.langCode].PROGRESS_TIMELINE,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.THOI_GIAN_QUY_TRINH
      },
      {
        title: this.languageData[this.langCode].DOCS_FORM,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.VAN_BAN_BIEU_MAU
      },
      {
        title: this.languageData[this.langCode].SETTING_EMAIL,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.EMAIL
      },
      {
        title: this.languageData[this.langCode].FORM,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.FORM,
      }
    ];

    this.khac = [
      {
        title: this.languageData[this.langCode].TOPICS_CENSORING_SAT,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.XET_DUYET_DE_TAI,
      },
      {
        title: this.languageData[this.langCode].TOPICS_CENSORING_FACULTY,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.XET_DUYET_DE_TAI_KHOA,
      },
      {
        title: this.languageData[this.langCode].CENSOR_COUNCILS,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG_XET_DUYET,
      },
      {
        title: this.languageData[this.langCode].TOPICS_CONTRACT,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.HOP_DONG,
      },
      {
        title: this.languageData[this.langCode].TOPICS_PROGRESS,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN,
      },
      {
        title: this.languageData[this.langCode].ACCEPTANCE_COUNCILS,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG_NGHIEM_THU,
      },
      {
        title: this.languageData[this.langCode].PROPOSING_THE_ACCEPTANCE_COMMITTEE,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.DE_XUAT_HOI_DONG,
      },
      {
        title: this.languageData[this.langCode].TOPICS_ACCEPTANCE,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.NGHIEM_THU_DE_TAI,
      },
      {
        title: this.languageData[this.langCode].TOPIC_SETTLEMENT,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.THANH_QUYET_TOAN,
      },
      {
        title: this.languageData[this.langCode].EXPORT_FILE,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.XUAT_FILE,
      },
      {
        title: this.languageData[this.langCode].CHANGE_PROCESS_TIME_OF_TOPIC,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.THAY_DOI_THOI_GIAN_QUY_TRINH,
      }
    ];

    this.congViecTDV = [
      {
        title: this.languageData[this.langCode].TOPICS_CENSORING_FACULTY,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.XET_DUYET_DE_TAI_KHOA
      },
      {
        title: this.languageData[this.langCode].PROPOSING_THE_ACCEPTANCE_COMMITTEE,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.DE_XUAT_HOI_DONG
      },
      {
        title: this.languageData[this.langCode].EXPORT_FILE,
        routerLink: UrlConstant.ROUTE.MANAGEMENT.XUAT_FILE
      }
    ];
  }

}
