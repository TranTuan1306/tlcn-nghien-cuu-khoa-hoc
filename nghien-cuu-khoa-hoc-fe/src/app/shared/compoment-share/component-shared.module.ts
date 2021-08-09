import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from '../widget/widget.module';
import { PipeUserModule } from '../widget/pipes/pipe-user.module';
import { PluginModule } from '../plugin.module';

import { ViewFileComponent } from './view-file/view-file.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ViewThanhVienHoiDongComponent } from './view-thanh-vien-hoi-dong/view-thanh-vien-hoi-dong.component';
import { EmailEditorModule } from 'angular-email-editor';
import { FormBaoCaoTienDoComponent } from './form-bao-cao-tien-do/form-bao-cao-tien-do.component';
import { FormHuyDeTaiShareComponent } from './form-huy-de-tai-share/form-huy-de-tai-share.component';
import { FormDuyetHuyDeTaiComponent } from 'src/app/management/b5-tien-do-thuc-hien/form-duyet-huy-de-tai/form-duyet-huy-de-tai.component';


const formComponents = [
  ViewFileComponent,
  FileUploadComponent,
  ViewThanhVienHoiDongComponent,
  FormBaoCaoTienDoComponent,
  FormHuyDeTaiShareComponent,
  FormDuyetHuyDeTaiComponent
];

@NgModule({
  declarations: [
    formComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PluginModule,
    WidgetModule,
    PipeUserModule,
    EmailEditorModule
  ],
  exports: [
    formComponents,
  ],
  providers: []
})
export class ComponentSharedModule { }
