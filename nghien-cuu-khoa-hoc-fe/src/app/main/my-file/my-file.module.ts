import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { myFileRoutes } from './my-file.routing';
import { ListDeTaiMyFileComponent } from './list-de-tai-my-file/list-de-tai-my-file.component';
import { FormFileDeTaiComponent } from './form-file-de-tai/form-file-de-tai.component';

@NgModule({
  declarations: [ListDeTaiMyFileComponent, FormFileDeTaiComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(myFileRoutes),
  ]
})
export class MyFileModule { }
