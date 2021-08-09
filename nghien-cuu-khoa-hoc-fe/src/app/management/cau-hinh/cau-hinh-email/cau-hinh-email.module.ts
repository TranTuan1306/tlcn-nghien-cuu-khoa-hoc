import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { cauHinhGuiMailRoutes } from './cau-hinh-email.routing';
import { FormCauHinhEmailComponent } from './form-cau-hinh-email/form-cau-hinh-email.component';
import { ListCauHinhEmailComponent } from './list-cau-hinh-email/list-cau-hinh-email.component';

@NgModule({
  declarations: [ListCauHinhEmailComponent, FormCauHinhEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(cauHinhGuiMailRoutes),
    SharedModule
  ]
})
export class CauHinhGuiMailModule { }
