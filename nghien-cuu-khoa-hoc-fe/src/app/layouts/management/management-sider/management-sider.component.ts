import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Component, Input, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';

@Component({
  selector: 'app-management-sider',
  templateUrl: './management-sider.component.html',
  styleUrls: ['./management-sider.component.scss']
})
export class ManagementSiderComponent implements OnInit {

  @Input() isCollapsed: boolean;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////
  messageTooltipConstant = MessageTooltipConstant[this.langCode];
  menuItem = [];
  menuItemAdmin = [
    {
      title: this.languageData[this.langCode].DASHBOARD,
      icon: 'fas fa-tachometer-alt',
      link: 'dashboard',
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].TOPICS_CENSORING_FACULTY,
      icon: 'fas fa-clipboard-check', //'file-search',
      link: UrlConstant.ROUTE.MANAGEMENT.XET_DUYET_DE_TAI_KHOA,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: false
    },
    {
      title: this.languageData[this.langCode].TOPICS_CENSORING_SAT,
      icon: 'fas fa-clipboard-check', //'file-search',
      link: UrlConstant.ROUTE.MANAGEMENT.XET_DUYET_DE_TAI,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].CENSOR_COUNCILS,
      icon: 'fas fa-file-signature', // file-protect
      link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG_XET_DUYET,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].TOPICS_CONTRACT,
      icon: 'fas fa-file-signature', // file-protect
      link: UrlConstant.ROUTE.MANAGEMENT.HOP_DONG,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].TOPICS_PROGRESS,
      icon: 'fas fa-tasks', // 'file-sync',
      link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].ACCEPTANCE_COUNCILS,
      icon: 'fas fa-file-signature', // file-protect
      link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG_NGHIEM_THU,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].PROPOSING_THE_ACCEPTANCE_COMMITTEE,
      icon: 'fas fa-file-signature', // file-protect
      link: UrlConstant.ROUTE.MANAGEMENT.DE_XUAT_HOI_DONG,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: false
    },
    {
      title: this.languageData[this.langCode].TOPICS_ACCEPTANCE,
      icon: 'fas fa-spell-check', // 'file-done',
      link: UrlConstant.ROUTE.MANAGEMENT.NGHIEM_THU_DE_TAI,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].TOPIC_SETTLEMENT,
      icon: 'fas fa-hand-holding-usd', // 'dollar',
      link: UrlConstant.ROUTE.MANAGEMENT.THANH_QUYET_TOAN,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].EXPORT_FILE,
      icon: 'fas fa-file-export', // 'dollar',
      link: UrlConstant.ROUTE.MANAGEMENT.XUAT_FILE,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].CHANGE_PROCESS_TIME_OF_TOPIC,
      icon: 'fas fa-exchange-alt', // 'dollar',
      link: UrlConstant.ROUTE.MANAGEMENT.THAY_DOI_THOI_GIAN_QUY_TRINH,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
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
      ],
      isShow: true
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
          subTitle: this.languageData[this.langCode].FORM,
          subLink: UrlConstant.ROUTE.MANAGEMENT.FORM,
          subRoles: []
        }
      ],
      isShow: true
    }
  ];

  menuItemLeadUint = [
    {
      title: this.languageData[this.langCode].DASHBOARD,
      icon: 'fas fa-tachometer-alt',
      link: 'dashboard',
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].TOPICS_CENSORING_FACULTY,
      icon: 'fas fa-clipboard-check', //'file-search',
      link: UrlConstant.ROUTE.MANAGEMENT.XET_DUYET_DE_TAI_KHOA,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].TOPICS_PROGRESS,
      icon: 'fas fa-tasks', // 'file-sync',
      link: UrlConstant.ROUTE.MANAGEMENT.TIEN_DO_THUC_HIEN,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].PROPOSING_THE_ACCEPTANCE_COMMITTEE,
      icon: 'fas fa-file-signature', // file-protect
      link: UrlConstant.ROUTE.MANAGEMENT.DE_XUAT_HOI_DONG,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].TOPICS_ACCEPTANCE,
      icon: 'fas fa-spell-check', // 'file-done',
      link: UrlConstant.ROUTE.MANAGEMENT.XEM_NGHIEM_THU_DE_TAI,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: true
    },
    {
      title: this.languageData[this.langCode].EXPORT_FILE,
      icon: 'fas fa-file-export', // 'dollar',
      link: UrlConstant.ROUTE.MANAGEMENT.XUAT_FILE,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: false
    },
    {
      title: this.languageData[this.langCode].TOPICS_CENSORING_SAT,
      icon: 'fas fa-clipboard-check', //'file-search',
      link: UrlConstant.ROUTE.MANAGEMENT.XET_DUYET_DE_TAI,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: false
    },
    {
      title: this.languageData[this.langCode].CENSOR_COUNCILS,
      icon: 'fas fa-file-signature', // file-protect
      link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG_XET_DUYET,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: false
    },
    {
      title: this.languageData[this.langCode].TOPICS_CONTRACT,
      icon: 'fas fa-file-signature', // file-protect
      link: UrlConstant.ROUTE.MANAGEMENT.HOP_DONG,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: false
    },
    {
      title: this.languageData[this.langCode].ACCEPTANCE_COUNCILS,
      icon: 'fas fa-file-signature', // file-protect
      link: UrlConstant.ROUTE.MANAGEMENT.HOI_DONG_NGHIEM_THU,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: false
    },
    {
      title: this.languageData[this.langCode].TOPIC_SETTLEMENT,
      icon: 'fas fa-hand-holding-usd', // 'dollar',
      link: UrlConstant.ROUTE.MANAGEMENT.THANH_QUYET_TOAN,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: false
    },
    {
      title: this.languageData[this.langCode].CHANGE_PROCESS_TIME_OF_TOPIC,
      icon: 'fas fa-exchange-alt', // 'dollar',
      link: UrlConstant.ROUTE.MANAGEMENT.THAY_DOI_THOI_GIAN_QUY_TRINH,
      roles: [],
      hasSubmenu: false,
      submenuItems: [],
      isShow: false
    }
  ];

  ngOnInit() {
    if (JSON.parse(localStorage.getItem(SystemConstant.CURRENT_ROLE_USER)).role === 'ROLE_ADMIN') {
      this.menuItem = this.menuItemAdmin;
    } else if (JSON.parse(localStorage.getItem(SystemConstant.CURRENT_ROLE_USER)).role === 'ROLE_TRUONG_DON_VI') {
      this.menuItem = this.menuItemLeadUint;
    }
  }
}
