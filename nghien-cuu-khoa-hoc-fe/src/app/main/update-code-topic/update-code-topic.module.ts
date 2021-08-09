import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { updateCodeTopicRoutes } from './update-code-topic.routing';
import { ListUpdateCodeTopicComponent } from './list-update-code-topic/list-update-code-topic.component';
import { FormUpdateCodeTopicComponent } from './form-update-code-topic/form-update-code-topic.component';

@NgModule({
  declarations: [ListUpdateCodeTopicComponent, FormUpdateCodeTopicComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(updateCodeTopicRoutes),
  ]
})
export class UpdateCodeTopicModule { }
