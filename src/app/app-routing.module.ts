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
    path: 'not-found',
    component: NotfoundComponent
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  { path: 'admin',
    loadChildren: './admin/admin.module.ts#AdminModule',
    canActivate: [AdminGuardService],
    canActivateChild: [AdminGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
