import { BieuMauModule } from 'src/app/shared/bieu-mau/bieu-mau.module';
import { ListMyTopicComponent } from './list-my-topic/list-my-topic.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { myTopicRoutes } from './my-topic.routing';
import { ViewProposalTopicComponent } from './view-proposal-topic/view-proposal-topic.component';

@NgModule({
  declarations: [
    ListMyTopicComponent,
    ViewProposalTopicComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BieuMauModule,
    // Routes
    RouterModule.forChild(myTopicRoutes),
  ]
})
export class MyTopicModule { }
