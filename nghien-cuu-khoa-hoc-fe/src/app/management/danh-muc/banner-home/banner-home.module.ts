import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { bannerHomeRoutes } from './banner-home.routing';
import { ListBannerComponent } from './list-banner/list-banner.component';
import { FormBannerComponent } from './form-banner/form-banner.component';


@NgModule({
  declarations: [ListBannerComponent, FormBannerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(bannerHomeRoutes),
    SharedModule
  ]
})
export class BannerHomeModule { }
