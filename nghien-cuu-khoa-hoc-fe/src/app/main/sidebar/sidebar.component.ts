import { SystemConstant } from 'src/app/core/constants/system.constant';
import { ThoiGianQuyTrinhService } from './../../core/services/management/cau-hinh/thoi-gian-quy-trinh.service';
import { DeTai } from './../../core/models/management/de-tai/de-tai.model';
import { DeTaiService } from './../../core/services/user/de-tai.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { MessageTooltipConstant } from 'src/app/core/constants/message-tooltip.constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', '../../../assets/theme/css/main.css']
})
export class SidebarComponent implements OnInit {

  isUploading = false;

  isLogin = false;
  isAuthor = false;
  isReviewer = false;
  isLangEdit = false;

  isNoNotify = false;
  isBaiVietCoPhanBienMoi = false;
  isLoiMoiPhanBienMoi = false;
  isCoBaiVietPhanBienMoi = false;
  thoiGianQuyTrinhActive = '';

  userName = '';
  userAvatarLink = '';

  listRoleUser: string[] = [];

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  messageTooltipConstant = MessageTooltipConstant[this.langCode];

  // type = routerLink / externalLink / srcLink
  parentRoute = 'desk';
  activatedLink = '';
  listDeTai: DeTai[] = [];
  timeNow = new Date();

  constructor(
    private router: Router,
    private nzModalSvc: NzModalService,
    private deTaiSvc: DeTaiService,
    private thoiGianQUyTrinhSvc: ThoiGianQuyTrinhService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (window.location.pathname.split('work/').pop().includes('/')) {
          this.activatedLink = window.location.pathname.split('work/').pop()
            .slice(0, window.location.pathname.split('work/').pop().indexOf('/'));
        } else {
          this.activatedLink = window.location.pathname.split('work/').pop();
        }
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('thoiGianQuyTrinhId')) {
      this.getAllDeTaiByCNDT();
    } else {
      this.getThoiGianQuyTrinhActive();
    }
    this.userName = JSON.parse(localStorage.getItem(SystemConstant.CURRENT_USER_GOOGLE)).name;
    this.userAvatarLink = JSON.parse(localStorage.getItem(SystemConstant.CURRENT_USER_GOOGLE)).photoUrl;
    if (JSON.parse(localStorage.getItem(SystemConstant.CURRENT_ROLE_USER)).role === 'ROLE_USER') {
      this.isAuthor = true;
    }
  }

  getThoiGianQuyTrinhActive() {
    this.thoiGianQUyTrinhSvc.getThoiGianQuyTrinhActive()
      .subscribe(res =>{
        this.thoiGianQuyTrinhActive = res[0].id;
        localStorage.setItem('thoiGianQuyTrinhId', res[0].id);
        this.getAllDeTaiByCNDT();
      });
  }

  getAllDeTaiByCNDT() {
    const thoiGianQUyTrinh = localStorage.getItem('thoiGianQuyTrinhId');
    this.deTaiSvc.getDeTaiByChuNhiemVaStatus(thoiGianQUyTrinh, [], 0, 50)
      .subscribe(res => {
        this.listDeTai = res.content;
      });
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


  checkThoiGianQuyTrinhHuongDanDangky(): boolean {
    return this.listDeTai.some(x =>
      this.timeNow >= new Date(x.thoiGianQuyTrinh.batDauHuongDan) &&
      this.timeNow <= new Date(x.thoiGianQuyTrinh.ketThucDangKy));
  }

  checkThoiGianQuyTrinhKyHopDong(): boolean {
    return this.listDeTai.some(x =>
      this.timeNow >= new Date(x.thoiGianQuyTrinh.batDauKyHopDong) &&
      this.timeNow <= new Date(x.thoiGianQuyTrinh.ketThucKyHopDong));
  }

  checkThoiGianQuyTrinhBoSungThuyetMinh(): boolean {
    return this.listDeTai.some(x =>
      this.timeNow >= new Date(x.thoiGianQuyTrinh.yeuCauBoSungThuyetMinh) &&
      this.timeNow <= new Date(x.thoiGianQuyTrinh.ketThucThanhQuyetToan));
  }

  checkThoiGianQuyTrinhBaoCaoTienDoVaKetQuaNghienCuu(): boolean {
    return this.listDeTai.some(x =>
      this.timeNow >= new Date(x.thoiGianQuyTrinh.batDauThucHien) &&
      this.timeNow <= new Date(x.thoiGianQuyTrinh.ketThucThucHien));
  }

  checkThoiGianQuyTrinhKetQuaNghiemThu(): boolean {
    if (this.listDeTai.some(x=> x.baoCaoTienDos[0]?.thoiGianNghiemThuDuKien)) {
      return this.listDeTai.some(x =>
        this.timeNow >= new Date(x.thoiGianQuyTrinh.batDauNghiemThu1) &&
        this.timeNow <= new Date(x.thoiGianQuyTrinh.ketThucThanhQuyetToan));
    } else {
      return this.listDeTai.some(x =>
        this.timeNow >= new Date(x.thoiGianQuyTrinh.batDauNghiemThu2) &&
        this.timeNow <= new Date(x.thoiGianQuyTrinh.ketThucThanhQuyetToan));
    }
  }

}
