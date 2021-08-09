import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { hopDongRoutes } from './hop-dong.routing';
import { ListDeTaiComponent } from './list-de-tai/list-de-tai.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(hopDongRoutes),
    SharedModule,
  ],
  declarations: [ListDeTaiComponent],
})
export class HopDongModule { }
