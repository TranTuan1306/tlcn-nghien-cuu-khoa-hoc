import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ThongBao } from './../../../core/models/management/de-tai/thong-bao.model';
import { ThongBaoService } from './../../../core/services/management/thong-bao/thong-bao.service';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { OAuth2Service } from 'src/app/core/services/auth/oauth2.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-management-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.scss', '../../../../assets/theme/css/main.css']
})
export class ManagementHeaderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() isCollapsed: boolean;
  @Output() changeCollapse: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////
  ///////////////////////////////

  isLogin = false;
  userName = '';
  tracking = null;
  trackingNotify = null;
  countNotifyCancelTopic = 0;
  isShowBell = false;
  listThongBao: ThongBao[] = [];

  constructor(
    private router: Router,
    private authSvc: OAuth2Service,
    private thongBaoSvc: ThongBaoService,
    private alert: ToastrService,
  ) { }

  ngOnInit() {
    const lang = localStorage.getItem('language');
    if (lang) {
      this.langCode = lang;
    } else {
      localStorage.setItem('language', 'en');
      this.langCode = 'en';
    }
    this.getAndSetUserToHeader();
    if (JSON.parse(localStorage.getItem(SystemConstant.CURRENT_ROLE_USER)).role === 'ROLE_ADMIN') {
      this.getAllThongBao();
      this.startTrackingLoop();
      this.isShowBell = true;
    }
    this.isLogin = true;
  }

  ngOnChanges() {
    if (JSON.parse(localStorage.getItem(SystemConstant.CURRENT_ROLE_USER)).role === 'ROLE_ADMIN') {
      this.getAllThongBao();
    }
  }

  ngOnDestroy() {
    if (JSON.parse(localStorage.getItem(SystemConstant.CURRENT_ROLE_USER))?.role === 'ROLE_ADMIN') {
      this.stopTrackingLoop();
    }
  }

  startTrackingLoop() {
    this.tracking = setInterval(() => {
      this.getAllThongBao();
    }, 10000);
    //120000
  }
  stopTrackingLoop() {
    clearInterval(this.tracking);
  }

  getAndSetUserToHeader() {
    this.authSvc.getUserInfo2(JSON.parse(localStorage.getItem('jwt_user')).access_token)
      .subscribe(res => {
        if (res.oauth2Request.approved) {
          this.isLogin = true;
          this.userName = JSON.parse(localStorage.getItem('jwt_user_google')).name;
        } else {
          this.isLogin = false;
          this.onLogOut();
        }
      }, err => {
        this.alert.warning(err);
        this.onLogOut();
        this.router.navigateByUrl('./');
      });
  }

  onLogOut(): void {
    this.authSvc.doLogout();
    this.isLogin = false;
    this.router.navigate(['/']);
  }

  switchLang(lang: string): void {
    localStorage.setItem('language', lang);
    this.langCode = lang;
    window.location.reload();
  }


  changeStatusCollapse() {
    this.changeCollapse.emit(!this.isCollapsed);
  }

  getAllThongBao() {
    this.thongBaoSvc.getAllPagingThongBao(0, 10)
      .subscribe(res => {
        this.listThongBao = res.content.reverse();
        this.countNotify();
      });
  }

  clickLinkToCancelDeTai(deTaiId: string) {
    const listId: string[] = [];
    this.listThongBao.map(x => {
      if (x.trangThai === 'CHUA_XEM') {
        listId.push(x.id);
      }
    });
    this.thongBaoSvc.capNhatThongBao(listId).subscribe(() => {
      this.getAllThongBao();
    });
    this.router.navigate(['/management/performing-progress/cancel-threads', deTaiId]);
  }

  countNotify() {
    this.countNotifyCancelTopic = 0;
    this.listThongBao.map(x => {
      if (x.trangThai === 'CHUA_XEM') {
        this.countNotifyCancelTopic += 1;
      }
    });
  }

  handleDateTime(date: string) {
    const dateCreate = new Date(date);
    const dateNow = new Date();
    return this.msToTime(dateNow.getTime() - dateCreate.getTime());
  }

  msToTime(ms: number) {
    const seconds = (ms / 1000).toFixed(1);
    const minutes = (ms / (1000 * 60)).toFixed(1);
    const hours = (ms / (1000 * 60 * 60)).toFixed(1);
    const days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (Number(seconds) < 60) {
      return this.langCode === 'vi' ? Math.round(Number(seconds)) + ' giây trước' : Math.round(Number(seconds)) + ' secconds ago';
    } else if (Number(minutes) < 60) {
      return this.langCode === 'vi' ? Math.round(Number(minutes)) + ' phút trước' : Math.round(Number(minutes)) + ' minutes ago';
    } else if (Number(hours) < 24) {
      return this.langCode === 'vi' ? Math.round(Number(hours)) + ' giờ trước' : Math.round(Number(hours)) + ' hours ago';
    } else {
      return this.langCode === 'vi' ? Math.round(Number(days)) + ' ngày trước'
        : Math.round(Number(days)) + (Number(days) === 1 ? ' day ago' : ' days ago');
    }
  }

}
