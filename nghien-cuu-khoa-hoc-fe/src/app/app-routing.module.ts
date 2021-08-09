import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlConstant } from './core/constants/url.constant';
import { AdminGuard } from './core/guards/admin.guard';
import { UnitLeaderGuard } from './core/guards/unitLeader.guard';
import { MasterGuard } from './core/guards/master.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./main/main.module`).then(m => m.MainModule)
  },
  {
    path: 'management',
    loadChildren: () => import(`./management/management.module`).then(m => m.ManagementModule),
    canActivate: [MasterGuard],
    data: {
      guards: [AdminGuard, UnitLeaderGuard],
      guardsRelation: 'OR',
      fallbackUrl: UrlConstant.ROUTE.MAIN.HOME
    }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
