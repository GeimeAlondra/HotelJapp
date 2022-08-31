import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './roles/form.component';
import { RolesComponent } from './roles/roles.component';
//import { FormComponent } from './pisos/form.component';
import { PisosComponent } from './pisos/pisos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { TipoHabitacionesComponent } from './tipo-habitaciones/tipo-habitaciones.component';

const routes: Routes = [
  {path: '',redirectTo: '/home', pathMatch: 'full'},
  {path: 'home',component: HomeComponent},
  
  {path: 'roles',component: RolesComponent},
  {path: 'roles/form',component: FormComponent}, 
  {path: 'roles/form/:id',component: FormComponent},
  
  {path: 'pisos',component: PisosComponent},
  {path: 'pisos/form',component: FormComponent}, 
  {path: 'pisos/form/:id',component: FormComponent},

  {path: 'servicios',component: ServiciosComponent},
  {path: 'servicios/form',component: FormComponent}, 
  {path: 'servicios/form/:id',component: FormComponent},

  {path: 'tipoHabitaciones',component: TipoHabitacionesComponent},
  {path: 'tipoHabitaciones/form',component: FormComponent}, 
  {path: 'tipoHabitaciones/form/:id',component: FormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
