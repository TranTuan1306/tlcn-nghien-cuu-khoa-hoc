import { SystemConstant } from 'src/app/core/constants/system.constant';
import { RoleUser } from './../../../core/models/oauth2/oauth2.interface';
import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Oauth2Config } from 'src/app/core/models/oauth2/oauth2-config.model';
import { UserGoogle } from 'src/app/core/models/oauth2/oauth2.interface';
import { OAuth2Service } from 'src/app/core/services/auth/oauth2.service';
import { ValidatorService } from 'src/app/core/services/common/validator.service';
import { mustMatch } from 'src/app/core/validators/must-match.validator';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss', '../../../../assets/theme/css/main.css']
})
export class MainHeaderComponent implements OnInit {

  @ViewChild('resetPass', { static: true }) resetPassModal: TemplateRef<unknown>;

  languageCode = 'vi';
  screenWidth = 992;

  loginTabIndex = 0;

  isResetPass = false;
  resetPassToken = '';
  formResetPass: FormGroup;
  showPass = false;

  isLogin = false;
  isAuthor = false;
  isTDV = false;
  isAdmin = false;
  isReviewer = false;

  userName = '';
  userAvatarLink = '';

  showCart = false;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') === 'vi' ? localStorage.getItem('language') : 'en';
  ///////////////////////////////

  constructor(
    private nzModalSvc: NzModalService,
    private activatedRouter: ActivatedRoute,
    private fbd: FormBuilder,
    private router: Router,
    private alert: ToastrService,
    private validatorService: ValidatorService,
    private spinner: NgxSpinnerService,
    private authSvc: OAuth2Service,
    private authGoogleService: SocialAuthService,
  ) {
    this.isResetPass = this.activatedRouter.snapshot.queryParamMap.has('token');
    this.resetPassToken = this.activatedRouter.snapshot.queryParamMap.get('token');
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('language');
    this.checkExist();
    if (lang) {
      this.languageCode = lang;
    } else {
      localStorage.setItem('language', 'en');
      this.languageCode = 'en';
    }
    this.getAndSetUserToHeader();
  }

  checkExist() {
    if (JSON.parse(localStorage.getItem(SystemConstant.CURRENT_ROLE_USER))?.authenticatePermissions === 'author') {
      this.isAuthor = true;
    }
    if (JSON.parse(localStorage.getItem(SystemConstant.CURRENT_ROLE_USER))?.authenticatePermissions === 'admin') {
      this.isAdmin = true;
    }
    if (JSON.parse(localStorage.getItem(SystemConstant.CURRENT_ROLE_USER))?.authenticatePermissions === 'unitLeader') {
      this.isAdmin = true;
    }
  }

  getAndSetUserToHeader() {
    if (localStorage.getItem('jwt_user')) {
      if (JSON.parse(localStorage.getItem('jwt_user')).access_token) {
        this.authSvc.getUserInfo2(JSON.parse(localStorage.getItem('jwt_user')).access_token)
          .subscribe(res => {
            if (res.oauth2Request.approved) {
              this.isLogin = true;
              this.userName = JSON.parse(localStorage.getItem('jwt_user_google')).name;
            } else {
              this.isLogin = false;
              this.isAuthor = false;
              this.isTDV = false;
              this.onLogOut();
            }
          }, err => {
            this.alert.warning(err);
            this.router.navigateByUrl('./');
            this.onLogOut();
          });
      }
    }
  }

  createFormResetPass(): void {
    this.formResetPass = this.fbd.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      token: [''],
    }, {
      validator: mustMatch('newPassword', 'confirmPassword')
    });
  }

  onLogin(modal: TemplateRef<unknown>, tabIndex: number): void {
    this.loginTabIndex = tabIndex;
    this.nzModalSvc.create({
      nzStyle: { top: '20px', width: '550px' },
      nzContent: modal,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  onLogOut(): void {
    this.authSvc.doLogout();
    this.isLogin = false;
    this.isAuthor = false;
    this.isAdmin = false;
    this.isTDV = false;
    this.router.navigate(['/']);
  }

  hideModal(): void {
    this.nzModalSvc.closeAll();
  }

  switchLang(lang: string): void {
    localStorage.setItem('language', lang);
    this.languageCode = lang;
    window.location.reload();
  }

  onResetPass(): void {
    if (this.formResetPass.valid) {
      // this.authSvc.resetPassword(this.formResetPass.value)
      // .subscribe(res => this.alert.success(res));
      this.nzModalSvc.closeAll();
      this.router.navigateByUrl('../');
    } else {
      this.validatorService.validateAllFormFields(this.formResetPass);
    }
  }

  isFieldValidResetPass(field: string): boolean {
    return (
      !this.formResetPass.get(field).valid && this.formResetPass.get(field).touched
    );
  }

  displayFieldCssResetPass(field: string): { 'has-error': boolean; 'has-feedback': boolean } {
    return {
      'has-error': this.isFieldValidResetPass(field),
      'has-feedback': this.isFieldValidResetPass(field)
    };
  }

  toggleShowPass(): void {
    this.showPass = !this.showPass;
  }

  // login with google
  onLoginWithGoogle(): void {
    this.authGoogleService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user) => {
        this.spinner.show();
        if (user) {
          this.spinner.show();
          const userGoogle = new UserGoogle(user.name, user.photoUrl);
          this.authSvc.setUserGoogle(userGoogle);
          this.authSvc
            .getAccessToken(user.authToken, new Oauth2Config())
            .subscribe(
              res => {
                this.authSvc.setOAuth2(res);
                this.authSvc.getUserInfo2(res.access_token)
                  .subscribe(res1 => {
                    this.spinner.hide();
                    // chuyển router
                    // if admin =>
                    if (res1.authorities.filter(x => x.authority === 'ROLE_ADMIN').length > 0) {
                      this.userName = res1.name;
                      const roleUser = new RoleUser('admin', 'ROLE_ADMIN');
                      this.authSvc.setUserRole(roleUser);
                      this.isAdmin = true;
                      this.alert.success(
                        'Đăng nhập vào hệ thống thành công! Xin chào quản trị viên!'
                      );
                      this.router.navigate([UrlConstant.ROUTE.MANAGEMENT.DASHBOARD]);
                    } else if (res1.authorities.filter(x => x.authority === 'ROLE_TRUONG_DON_VI').length > 0) {
                      this.userName = res1.name;
                      const roleUser = new RoleUser('unitLeader', 'ROLE_TRUONG_DON_VI');
                      this.authSvc.setUserRole(roleUser);
                      this.isLogin = true;
                      this.isTDV = true;
                      this.alert.success(
                        'Đăng nhập vào hệ thống thành công. Xin chào trưởng đơn vị!'
                      );
                      // if user =>
                      // this.router.navigate([UrlConstant.ROUTE.MAIN.HOME]);
                      this.router.navigate([UrlConstant.ROUTE.MANAGEMENT.DASHBOARD]);
                    } else {
                      const roleUser = new RoleUser('author', 'ROLE_USER');
                      this.authSvc.setUserRole(roleUser);
                      this.userName = res1.name;
                      this.isLogin = true;
                      this.alert.success(
                        'Đăng nhập vào hệ thống thành công. Xin chào chủ nhiệm đề tài!'
                      );
                      this.isAuthor = true;
                      // if user =>
                      // this.router.navigate([UrlConstant.ROUTE.MAIN.HOME]);
                      this.router.navigate(['/work']);
                    }
                  });
              },
              () => {
                this.spinner.hide();
              }
            );
        }
      }
    );
  }

}
