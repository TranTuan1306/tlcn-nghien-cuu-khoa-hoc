import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from '../widget/widget.module';
import { PipeUserModule } from '../widget/pipes/pipe-user.module';
import { PluginModule } from '../plugin.module';

import { ViewFileComponent } from './view-file/view-file.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ViewThanhVienHoiDongComponent } from './view-thanh-vien-hoi-dong/view-thanh-vien-hoi-dong.component';
import { FormGuiEmailComponent } from './form-gui-email/form-gui-email.component';
import { EmailEditorModule } from 'angular-email-editor';

const formComponents = [
  ViewFileComponent,
  FileUploadComponent,
  ViewThanhVienHoiDongComponent,
  FormGuiEmailComponent,
];

@NgModule({
  declarations: [
    formComponents,
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
    formComponents
  ],
  providers: []
})
export class ComponentSharedModule { }
