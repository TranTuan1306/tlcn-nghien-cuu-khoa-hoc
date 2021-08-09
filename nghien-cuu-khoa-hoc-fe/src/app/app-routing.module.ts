import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import(`./main/main.module`).then(m => m.MainModule) },
  // { path: 'login', loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule) },
  { path: 'management', loadChildren: () => import(`./management/management.module`).then(m => m.ManagementModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
