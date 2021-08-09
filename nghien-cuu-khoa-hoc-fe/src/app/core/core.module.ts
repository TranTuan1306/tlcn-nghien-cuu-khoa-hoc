import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './interceptors';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HandlerErrorService } from './services/common/handler-error.service';
import { ValidatorService } from './services/common/validator.service';
import { OAuth2Service } from './services/auth/oauth2.service';
import { AdminGuard } from './guards/admin.guard';
import { AuthorGuard } from './guards/author.guard';
import { UnitLeaderGuard } from './guards/unitLeader.guard';
import { MasterGuard } from './guards/master.guard';

@NgModule({
  providers: [
    HandlerErrorService,
    httpInterceptorProviders,
    ValidatorService,
    OAuth2Service,
    AuthorGuard,
    UnitLeaderGuard,
    AdminGuard,
    MasterGuard
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  exports: [HttpClientModule, ToastrModule]
})
export class CoreModule { }
