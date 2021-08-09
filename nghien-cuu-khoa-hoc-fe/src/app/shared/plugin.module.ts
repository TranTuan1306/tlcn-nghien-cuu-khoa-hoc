import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Zorro
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
const ngZorroAntdModule = [
  NzButtonModule,
  NzDropDownModule,
  NzGridModule,
  NzLayoutModule,
  NzBreadCrumbModule,
  NzDatePickerModule,
  NzInputModule,
  NzInputNumberModule,
  NzSelectModule,
  NzCarouselModule,
  NzEmptyModule,
  NzPopoverModule,
  NzTableModule,
  NzTabsModule,
  NzTagModule,
  NzModalModule,
  NzPopconfirmModule,
  NzCheckboxModule,
  NzFormModule,
  NzToolTipModule,
];
import { NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

// //////////////
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ngZorroAntdModule,
    NgxSpinnerModule,
    ImageCropperModule,
    NgxExtendedPdfViewerModule,
    NgxDocViewerModule,
    CKEditorModule,
  ],
  exports: [
    ngZorroAntdModule,
    NgxSpinnerModule,
    ImageCropperModule,
    NgxExtendedPdfViewerModule,
    NgxDocViewerModule,
    DragDropModule,
    CKEditorModule,
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons }]
})
export class PluginModule { }
