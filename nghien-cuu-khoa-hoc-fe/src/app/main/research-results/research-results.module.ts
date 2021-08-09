import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { researchResulsRoutes } from './research-results.routing';
import { ListResearchResultsComponent } from './list-research-results/list-research-results.component';
import { FormResearchResultsComponent } from './form-research-results/form-research-results.component';


@NgModule({
  declarations: [
    ListResearchResultsComponent,
    FormResearchResultsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(researchResulsRoutes),
  ]
})
export class ResearchResultsModule { }
