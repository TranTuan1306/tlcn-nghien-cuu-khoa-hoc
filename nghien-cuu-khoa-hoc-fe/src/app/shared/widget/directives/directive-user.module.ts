
import { NgModule } from '@angular/core';
import { GetFileInfoByIdDirective } from './get-file-info.directive';
import { GetFileImageDirective } from './get-image-view.directive';
import { NumberSeparatorDirective } from './number-separator.directive';

@NgModule({
  declarations: [
    GetFileInfoByIdDirective,
    NumberSeparatorDirective,
    GetFileImageDirective
  ],
  imports: [

  ],
  exports: [
    GetFileInfoByIdDirective,
    NumberSeparatorDirective,
    GetFileImageDirective
  ],
  providers: []
})
export class DirectiveUserModule { }
