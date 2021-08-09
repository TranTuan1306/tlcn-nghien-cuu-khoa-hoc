import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { proposalAndExplanationRoutes } from './proposal-and-explanation.routing';
import { ListTopicProposalAndExplanationComponent }
  from './list-topic-proposal-and-explanation/list-topic-proposal-and-explanation.component';
import { FormMyTopicComponent } from './form-my-topic/form-my-topic.component';
import { Form01DeXuatDeTaiComponent } from './form01-de-xuat-de-tai/form01-de-xuat-de-tai.component';
import { Form02ThuyetMinhDeTaiComponent } from './form02-thuyet-minh-de-tai/form02-thuyet-minh-de-tai.component';
import { Form02bsDonViPhoiHopComponent } from './form02-thuyet-minh-de-tai/form02bs-don-vi-phoi-hop/form02bs-don-vi-phoi-hop.component';
import { Form02bsPhuLucKinhPhiComponent } from './form02-thuyet-minh-de-tai/form02bs-phu-luc-kinh-phi/form02bs-phu-luc-kinh-phi.component';
import { Form02bsSanPhamComponent } from './form02-thuyet-minh-de-tai/form02bs-san-pham/form02bs-san-pham.component';
import { Form02bsThanhVienThamGiaComponent }
  from './form02-thuyet-minh-de-tai/form02bs-thanh-vien-tham-gia/form02bs-thanh-vien-tham-gia.component';
import { Form02bsTienDoComponent } from './form02-thuyet-minh-de-tai/form02bs-tien-do/form02bs-tien-do.component';



@NgModule({
  declarations: [
    ListTopicProposalAndExplanationComponent,
    FormMyTopicComponent,
    Form01DeXuatDeTaiComponent,
    Form02ThuyetMinhDeTaiComponent,
    Form02bsDonViPhoiHopComponent,
    Form02bsPhuLucKinhPhiComponent,
    Form02bsSanPhamComponent,
    Form02bsThanhVienThamGiaComponent,
    Form02bsTienDoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(proposalAndExplanationRoutes),
  ]
})
export class ProposalAndExplanationRoutesModule { }
