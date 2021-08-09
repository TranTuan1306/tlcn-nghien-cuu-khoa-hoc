import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { additionalExplanationRoutes } from './additional-explanation.routing';
import { ListAdditionalExplanationComponent } from './list-additional-explanation/list-additional-explanation.component';
import { FormAdditionalExplanationComponent } from './form-additional-explanation/form-additional-explanation.component';


@NgModule({
  declarations: [ListAdditionalExplanationComponent, FormAdditionalExplanationComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(additionalExplanationRoutes),
  ]
})
export class AdditionalExplanationModule { }
