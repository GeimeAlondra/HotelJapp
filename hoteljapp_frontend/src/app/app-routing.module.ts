import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './roles/form.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {path: '',redirectTo: '/home', pathMatch: 'full'},
  {path: 'home',component: HomeComponent},
  {path: 'roles',component: RolesComponent},
  {path: 'roles/form',component: FormComponent}, 
  {path: 'roles/form/:id',component: FormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
