import { Routes } from '@angular/router';

export const cauHinhRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'progress-timeline',
        pathMatch: 'full'
      },
      {
        path: 'progress-timeline',
        loadChildren: () => import('./thoi-gian-quy-trinh/thoi-gian-quy-trinh.module').then(m => m.ThoiGianQuyTrinhModule)
      },
      {
        path: 'do-tuoi-giang-vien',
        loadChildren: () => import('./do-tuoi-giang-vien/do-tuoi-giang-vien.module').then(m => m.DoTuoiGiangVienModule)
      },
      {
        path: 'docs-form',
        loadChildren: () => import('./van-ban-bieu-mau/van-ban-bieu-mau.module').then(m => m.VanBanBieuMauModule)
      },
      {
        path: 'email-account',
        loadChildren: () => import('./cau-hinh-email/cau-hinh-email.module').then(m => m.CauHinhGuiMailModule)
      },
      {
        path: 'email-content',
        loadChildren: () => import('./noi-dung-email/noi-dung-email.module').then(m => m.NoiDungEmailModule)
      },
    ]
  }
];
