import { Component, Input } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';

@Component({
  selector: 'app-management-sider',
  templateUrl: './management-sider.component.html',
  styleUrls: ['./management-sider.component.scss']
})
export class ManagementSiderComponent {

  @Input() isCollapsed: boolean;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  menuItem = [
    {
      title: this.languageData[this.langCode].DASHBOARD,
      icon: 'fas fa-tachometer-alt',
      link: 'dashboard',
      roles: [],
      hasSubmenu: false,
      submenuItems: []
    },
    {
      title: this.languageData[this.langCode].COUNCILS,
      icon: 'team',
      link: '#',
      roles: [],
      hasSubmenu: true,
      submenuItems: [
        {
          subTitle: this.languageData[this.langCode].CENSOR_COUNCILS,
          subLink: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG_XET_DUYET,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].ACCEPTANCE_COUNCILS,
          subLink: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG_NGHIEM_THU,
          subRoles: []
        },
      ]
    },
    {
      title: this.languageData[this.langCode].TOPICS_CENSORING,
      icon: 'fas fa-file-alt', //'file-search',
      link: UrlConstant.ROUTE.MANAGEMENT.XET_DUYET_DE_TAI,
      roles: [],
      hasSubmenu: false,
      submenuItems: []
    },
    {
      title: this.languageData[this.langCode].TOPICS_CONTRACT,
      icon: 'fas fa-file-signature', // file-protect
      link: UrlConstant.ROUTE.MANAGEMENT.HOP_DONG,
      roles: [],
      hasSubmenu: false,
      submenuItems: []
    },
    {
      title: this.languageData[this.langCode].TOPICS_PROGRESS,
      icon: 'fas fa-tasks', // 'file-sync',
      link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN,
      roles: [],
      hasSubmenu: false,
      submenuItems: []
    },
    {
      title: this.languageData[this.langCode].TOPICS_ACCEPTANCE,
      icon: 'fas fa-spell-check', // 'file-done',
      link: UrlConstant.ROUTE.MANAGEMENT.NGHIEM_THU_DE_TAI,
      roles: [],
      hasSubmenu: false,
      submenuItems: []
    },
    {
      title: this.languageData[this.langCode].TOPIC_SETTLEMENT,
      icon: 'fas fa-hand-holding-usd', // 'dollar',
      link: UrlConstant.ROUTE.MANAGEMENT.THANH_QUYET_TOAN,
      roles: [],
      hasSubmenu: false,
      submenuItems: []
    },
    {
      title: this.languageData[this.langCode].EXPORT_FILE,
      icon: 'fas fa-file-export', // 'dollar',
      link: UrlConstant.ROUTE.MANAGEMENT.XUAT_FILE,
      roles: [],
      hasSubmenu: false,
      submenuItems: []
    },
    {
      title: this.languageData[this.langCode].CATEGORIES,
      icon: 'appstore',
      link: '#',
      roles: [],
      hasSubmenu: true,
      submenuItems: [
        {
          subTitle: this.languageData[this.langCode].BANNER_HOME,
          subLink: UrlConstant.ROUTE.MANAGEMENT.BANNER,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].NEWS,
          subLink: UrlConstant.ROUTE.MANAGEMENT.TIN_TUC,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].CATEGORIES_ARTICLES,
          subLink: UrlConstant.ROUTE.MANAGEMENT.CHUYEN_MUC_BAI_VIET,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].ARTICLES,
          subLink: UrlConstant.ROUTE.MANAGEMENT.BAI_VIET_THEO_CHUYEN_MUC,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].ACADEMIC_RANK,
          subLink: UrlConstant.ROUTE.MANAGEMENT.HOC_HAM,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].DEGREE,
          subLink: UrlConstant.ROUTE.MANAGEMENT.HOC_VI,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].RESEARCH_DOMAIN,
          subLink: UrlConstant.ROUTE.MANAGEMENT.LINH_VUC_NGHIEN_CUU,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].RESEARCH_TYPE,
          subLink: UrlConstant.ROUTE.MANAGEMENT.LOAI_HINH_NGHIEN_CUU,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].PRODUCT,
          subLink: UrlConstant.ROUTE.MANAGEMENT.SAN_PHAM,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].EXPENSE_TYPE,
          subLink: UrlConstant.ROUTE.MANAGEMENT.LOAI_KINH_PHI,
          subRoles: []
        },
      ]
    },
    {
      title: this.languageData[this.langCode].SETTING,
      icon: 'setting',
      link: '#',
      roles: [],
      hasSubmenu: true,
      submenuItems: [
        {
          subTitle: this.languageData[this.langCode].PROGRESS_TIMELINE,
          subLink: UrlConstant.ROUTE.MANAGEMENT.THOI_GIAN_QUY_TRINH,
          subRoles: []
        },
        {
          subTitle: 'Thông báo',
          subLink: UrlConstant.ROUTE.MANAGEMENT.THONG_BAO,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].DOCS_FORM,
          subLink: UrlConstant.ROUTE.MANAGEMENT.VAN_BAN_BIEU_MAU,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].SETTING_EMAIL,
          subLink: UrlConstant.ROUTE.MANAGEMENT.EMAIL,
          subRoles: []
        },
        {
          subTitle: this.languageData[this.langCode].CONTENT_EMAIL,
          subLink: UrlConstant.ROUTE.MANAGEMENT.CONTENT_EMAIL,
          subRoles: []
        },
        {
          subTitle: 'Độ tuổi giảng viên',
          subLink: UrlConstant.ROUTE.MANAGEMENT.DO_TUOI_GIANG_VIEN,
          subRoles: []
        },
      ]
    },
    {
      title: this.languageData[this.langCode].TOPICS_CENSORING,
      icon: 'file-sync',
      link: '#',
      roles: [],
      hasSubmenu: true,
      submenuItems: [
        {
          subTitle: this.languageData[this.langCode].TOPICS_CENSORING,
          subLink: UrlConstant.ROUTE.MANAGEMENT.XET_DUYET_DE_TAI,
          subRoles: []
        }
      ]
    }
  ];
}
