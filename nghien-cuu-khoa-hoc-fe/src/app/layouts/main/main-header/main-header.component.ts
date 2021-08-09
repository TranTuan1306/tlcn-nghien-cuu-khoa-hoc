import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { NzModalService } from 'ng-zorro-antd';
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
  styleUrls: ['./main-header.component.scss', '../../../../assets/journey-theme/css/main.css']
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
  isReviewer = false;

  userName = '';
  userAvatarLink = '';

  showCart = false;

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
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

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('language');
    if (lang) {
      this.languageCode = lang;
    } else {
      localStorage.setItem('language', 'en');
      this.languageCode = 'en';
    }
    if (this.isResetPass) {
      this.createFormResetPass();
      this.nzModalSvc.create({
        nzStyle: { top: '20px', width: '550px' },
        nzTitle: this.languageData[this.langCode].CHANGE_PASSWORD,
        nzContent: this.resetPassModal,
        nzFooter: null,
        nzMaskClosable: false,
        nzOnCancel: () => { this.router.navigateByUrl('../'); },
      });
      this.formResetPass.get('token').setValue(this.resetPassToken);
    } else {
      setTimeout(() => this.screenWidth = window.innerWidth, 1000);
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
                      localStorage.setItem('admin', 'ok');
                      this.alert.success(
                        'Đăng nhập vào hệ thống thành công!'
                      );
                      this.router.navigate([UrlConstant.ROUTE.MANAGEMENT.DASHBOARD]);
                    } else if (res1.authorities.filter(x => x.authority === 'ROLE_CNDT').length > 0) {
                      this.alert.success(
                        'Đăng nhập vào hệ thống thành công.'
                      );
                      // if user =>
                      this.router.navigate([UrlConstant.ROUTE.MAIN.HOME]);
                    } else {
                      this.alert.error(
                        'Thông tin đăng nhập không tồn tại!'
                      );
                      this.authSvc.doLogout();
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
