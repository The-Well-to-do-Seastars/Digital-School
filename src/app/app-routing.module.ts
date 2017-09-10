import { ScheduleTableComponent } from './shared/schedule/schedule-table/schedule-table.component';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { AdminGuardService } from './core/guards/admin-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './static-components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'not_found',
    component: NotfoundComponent
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module.ts#AdminModule',
    canActivate: [AdminGuardService],
    canActivateChild: [AdminGuardService]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  { path: '**', redirectTo: '/not_found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
