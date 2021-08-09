import { Routes } from '@angular/router';

export const danhMucRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'hoc-vi',
        pathMatch: 'full'
      },
      {
        path: 'banner',
        loadChildren: () => import('./banner-home/banner-home.module').then(m => m.BannerHomeModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./tin-tuc/tin-tuc.module').then(m => m.TinTucModule)
      },
      {
        path: 'categories-articles',
        loadChildren: () => import('./chuyen-muc-bai-viet/chuyen-muc-bai-viet.module').then(m => m.ChuyenMucBaiVietModule)
      },
      {
        path: 'articles',
        loadChildren: () => import('./bai-viet-theo-chuyen-muc/bai-viet-theo-chuyen-muc.module').then(m => m.BaiVietModule)
      },
      {
        path: 'academic-rank',
        loadChildren: () => import('./hoc-ham/hoc-ham.module').then(m => m.HocHamModule)
      },
      {
        path: 'degree',
        loadChildren: () => import('./hoc-vi/hoc-vi.module').then(m => m.HocViModule)
      },
      {
        path: 'research-domain',
        loadChildren: () => import('./linh-vuc-nghien-cuu/linh-vuc-nghien-cuu.module').then(m => m.LinhVucNghienCuuModule)
      },
      {
        path: 'research-type',
        loadChildren: () => import('./loai-hinh-nghien-cuu/loai-hinh-nghien-cuu.module').then(m => m.LoaiHinhNghienCuuModule)
      },
      {
        path: 'product-type',
        loadChildren: () => import('./san-pham/san-pham.module').then(m => m.SanPhamModule)
      },
      {
        path: 'expense-type',
        loadChildren: () => import('./loai-kinh-phi/loai-kinh-phi.module').then(m => m.LoaiKinhPhiModule)
      },
    ]
  }
];
