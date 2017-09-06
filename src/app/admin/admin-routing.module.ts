import { AdminComponent } from './admin.component';
import { GenerateClassComponent } from './generate-class/generate-class.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'generate_class', component: GenerateClassComponent },
  { path: 'home', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
