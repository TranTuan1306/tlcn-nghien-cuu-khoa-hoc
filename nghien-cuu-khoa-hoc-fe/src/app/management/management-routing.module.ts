import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementLayoutComponent } from '../layouts/management/management-layout/management-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: '', component: ManagementLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../main/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'categories',
        loadChildren: () => import('./danh-muc/danh-muc.module').then(m => m.DanhMucModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('./cau-hinh/cau-hinh.module').then(m => m.CauHinhModule)
      },
      {
        path: 'councils',
        loadChildren: () => import('./hoi-dong/hoi-dong.module').then(m => m.HoiDongModule)
      },
      {
        path: 'topics-censoring',
        loadChildren: () => import('./b3-xet-duyet-de-tai/xet-duyet-de-tai.module').then(m => m.XetDuyetDeTaiModule)
      },

      {
        path: 'topics-censoring-faculty',
        loadChildren: () => import('./b3-xet-duyet-de-tai-truong-don-vi/xet-duyet-de-tai-truong-don-vi.module')
          .then(m => m.XetDuyetDeTaiTruongDonViModule)
      },
      {
        path: 'contract-signing',
        loadChildren: () => import('./b4-hop-dong/hop-dong.module').then(m => m.HopDongModule)
      },
      {
        path: 'propose-acceptance-committee',
        loadChildren: () => import('./de-xuat-hoi-dong-nghiem-thu/de-xuat-hoi-dong-nghiem-thu.module')
          .then(m => m.DeXuatHoiDongNghiemThuRoutesModule)
      },
      {
        path: 'performing-progress',
        loadChildren: () => import('./b5-tien-do-thuc-hien/tien-do-thuc-hien.module').then(m => m.TienDoThucHienModule)
      },
      {
        path: 'topics-inspect',
        loadChildren: () => import('./b6-nghiem-thu-de-tai/nghiem-thu-de-tai.module').then(m => m.NghiemThuDeTaiModule)
      },
      {
        path: 'topics-settle',
        loadChildren: () => import('./b7-thanh-quyet-toan/thanh-quyet-toan.module').then(m => m.ThanhQuyetToanModule)
      },
      {
        path: 'export-file',
        loadChildren: () => import('./b8-xuat-file/xuat-file.module').then(m => m.XuatFileModule)
      },
      {
        path: 'change-timeline-of-project',
        loadChildren: () => import('./thay-doi-thoi-gian-quy-trinh-de-tai/thay-doi-thoi-gian-quy-trinh-de-tai.module')
          .then(m => m.DeXuatHoiDongNghiemThuRoutesModule)
      },
      {
        path: 'view-topics-inspect',
        loadChildren: () => import('./tdv-view-nghiem-thu/tdv-view-nghiem-thu.module')
          .then(m => m.TDVViewNghiemThuModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
