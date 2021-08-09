import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { ManagementModule } from './management/management.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';


import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { vi_VN, en_US, NZ_I18N, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { vi as vn } from 'date-fns/locale';
import  vi  from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(localStorage.getItem('language') === 'vi' ? vi : en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    ManagementModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SocialLoginModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: localStorage.getItem('language') === 'vi' ? vi_VN : en_US },
    { provide: NZ_DATE_LOCALE, useValue: vn },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.keyGoogle
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
