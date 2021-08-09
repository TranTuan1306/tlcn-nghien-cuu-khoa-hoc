import { Component, DoCheck, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { LanguageConstant } from 'src/app/core/constants/language.constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', '../../../assets/journey-theme/css/main.css']
})
export class SidebarComponent implements OnInit, DoCheck {

  isUploading = false;

  isLogin = false;
  isAuthor = false;
  isReviewer = false;
  isLangEdit = false;

  isNoNotify = false;
  isBaiVietCoPhanBienMoi = false;
  isLoiMoiPhanBienMoi = false;
  isCoBaiVietPhanBienMoi = false;

  userName = '';
  userAvatarLink = '';

  listRoleUser: string[] = [];

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  // type = routerLink / externalLink / srcLink
  parentRoute = 'desk';
  activatedLink = '';
  menu = [
    {
      icon: 'fas fa-bookmark',
      title: this.languageData[this.langCode].SUBMIT_GUIDE,
      type: 'srcLink',
      link: this.langCode === 'en' ? 'assets/pdf/en-guide.pdf' : 'assets/pdf/vn-guide.pdf',
      requiredLogin: false,
      role: [],
      notifyVariable: 'isNoNotify'
    },
    {
      icon: 'fas fa-pen-fancy',
      title: this.languageData[this.langCode].FORMAT_GUIDE,
      type: 'srcLink',
      link: this.langCode === 'en' ? 'assets/pdf/en-format.pdf' : 'assets/pdf/vn-format.pdf',
      requiredLogin: false,
      role: [],
      notifyVariable: 'isNoNotify'
    },
    {
      icon: 'fas fa-list-ul',
      title: this.languageData[this.langCode].LIST_ARTICLES,
      type: 'routerLink',
      link: `ban-thao`,
      requiredLogin: true,
      role: [],
      notifyVariable: 'isBaiVietCoPhanBienMoi'
    },
    {
      icon: 'fas fa-list-ul',
      title: this.languageData[this.langCode].REVIEW_INVITE,
      type: 'routerLink',
      link: `loi-moi-phan-bien`,
      requiredLogin: true,
      role: [],
      notifyVariable: 'isLoiMoiPhanBienMoi'
    },
    {
      icon: 'fas fa-list-ul',
      title: this.languageData[this.langCode].REVIEW_ARTICLE,
      type: 'routerLink',
      link: `phan-bien`,
      requiredLogin: true,
      role: [],
      notifyVariable: 'isCoBaiVietPhanBienMoi'
    },
    {
      icon: 'fas fa-list-ul',
      title: this.languageData[this.langCode].EDIT_LANGUAGE,
      type: 'routerLink',
      link: `hieu-chinh-ngon-ngu`,
      requiredLogin: true,
      role: [],
      notifyVariable: 'isNoNotify'
    }
  ];

  constructor(
    // private router: Router,
    // private trackingLinkHuongDan: TrackingHuongDanService,
    // private noiDungHuongDanSvc: NoiDungHuongDanService,
    private nzModalSvc: NzModalService,
    // private userSvc: QuanLyNguoiDungService,
    // private authSvc: AuthenticateService,
    // private fileSvc: FileControllerService,
    // private handleErrSvc: HandlerErrorService,
    // private dotXuatBanSvc: DotXuatBanService,
    // private danhSachPhanBienSvc: DanhSachPhanBienService,
  ) { }

  ngOnInit(): void {
    // if (this.authSvc.isExpiteToken()) {
    //   this.authSvc.doLogout();
    // } else {
    //   this.userName = this.authSvc.getUserInfoData().name;
    //   this.userAvatarLink = this.authSvc.getUserInfoData().photoUrl;
    //   this.listRoleUser = this.authSvc.getToken().roles;

    //   if (this.listRoleUser.includes(SystemConstant.ROLES.ROLE_AUTHOR)) { this.isAuthor = true; }
    //   if (this.listRoleUser.includes(SystemConstant.ROLES.ROLE_REVIEWER)) { this.isReviewer = true; }
    //   if (this.listRoleUser.includes(SystemConstant.ROLES.ROLE_LANGUAGE_EDITOR)) { this.isLangEdit = true; }
    //   this.isLogin = true;
    // }
    this.activatedLink = window.location.pathname.split('/').pop();
  }
  ngDoCheck(): void {
    this.activatedLink = window.location.pathname.split('/').pop();
  }

  checkNotify(): void {
    // check bai viet co phan hoi phan bien moi

    // check loi moi phan bien moi

    // check tac gia da chinh sua bai viet
  }

  checkRole(roleArr: string[]): boolean {
    for (let i = 0; i < roleArr.length; i++) {
      if (i === roleArr.length - 1) {
        if (this.listRoleUser.includes(roleArr[i])) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.listRoleUser.includes(roleArr[i])) {
          return true;
        }
      }
    }
  }

  openModal(modal: TemplateRef<unknown>): void {
    this.nzModalSvc.create({
      nzStyle: { top: '20px', width: '550px' },
      nzContent: modal,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  hideModal(): void {
    this.nzModalSvc.closeAll();
  }

}
