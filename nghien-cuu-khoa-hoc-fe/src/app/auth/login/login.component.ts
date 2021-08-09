import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Oauth2Config } from 'src/app/core/models/oauth2/oauth2-config.model';
import { UserGoogle } from 'src/app/core/models/oauth2/oauth2.interface';
import { OAuth2Service } from 'src/app/core/services/auth/oauth2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../assets/theme/css/main.css']
})
export class LoginComponent implements OnInit {

  @Input() nzSelectedIndexTab?: number;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Ngon ngu hien thi //////////
  languageData = LanguageConstant;
  langCode = localStorage.getItem('language') ? localStorage.getItem('language') : 'vi';
  ///////////////////////////////

  form: FormGroup;

  showPassLogin = false;

  constructor(
    private fb: FormBuilder,
    private oAuth2Service: OAuth2Service,
    private authGoogleService: SocialAuthService,
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private router: Router,
  ) {
    this.nzSelectedIndexTab = this.nzSelectedIndexTab ? this.nzSelectedIndexTab : 0;
    this.createFormGroupLogin();
  }


  ngOnInit(): void { }

  // Login
  createFormGroupLogin(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }

  isFieldValid(field: string): boolean {
    return (!this.form.get(field).valid && this.form.get(field).touched);
  }

  displayFieldCss(field: string): { 'has-error': boolean; 'has-feedback': boolean } {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  toggleShowPassLogin(): void {
    this.showPassLogin = !this.showPassLogin;
  }

  onCancel(): void {
    this.closeModal.emit(false);
  }

  /////////////////////////////////////////////////////

  // login with google
  onLoginWithGoogle(): void {
    this.authGoogleService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user) => {
        this.spinner.show();
        if (user) {
          this.spinner.show();
          const userGoogle = new UserGoogle(user.name, user.photoUrl);
          this.oAuth2Service.setUserGoogle(userGoogle);
          this.oAuth2Service
            .getAccessToken(user.authToken, new Oauth2Config())
            .subscribe(
              res => {
                this.oAuth2Service.setOAuth2(res);
                this.oAuth2Service.getUserInfo2(res.access_token)
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
                      // this.alert.error(
                      //   'Thông tin đăng nhập không tồn tại!AAAAAAAAA'
                      // );
                      // this.oAuth2Service.doLogout();
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

  onLoginWithForm(): void { }

}
