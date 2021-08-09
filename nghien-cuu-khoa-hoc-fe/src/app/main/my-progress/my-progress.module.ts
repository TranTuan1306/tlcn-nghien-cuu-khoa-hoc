import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { myProgressRoutes } from './my-progress.routing';
import { ListMyProgressComponent } from './list-my-progress/list-my-progress.component';
import { FormMyProgressComponent } from './form-my-progress/form-my-progress.component';
import { FormBaoCaoTienDoComponent } from './form-bao-cao-tien-do/form-bao-cao-tien-do.component';
import { FormNoiDungNghienCuuComponent } from './form-noi-dung-nghien-cuu/form-noi-dung-nghien-cuu.component';
import { FormSanPhamComponent } from './form-san-pham/form-san-pham.component';
import { ListHuyDeTaiComponent } from './list-huy-de-tai/list-huy-de-tai.component';
import { FormHuyDeTaiComponent } from './form-huy-de-tai/form-huy-de-tai.component';


@NgModule({
  declarations: [
    FormMyProgressComponent,
    ListMyProgressComponent,
    FormBaoCaoTienDoComponent,
    FormNoiDungNghienCuuComponent,
    FormSanPhamComponent,
    ListHuyDeTaiComponent,
    FormHuyDeTaiComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(myProgressRoutes),
  ]
})
export class MyProgressModule { }
