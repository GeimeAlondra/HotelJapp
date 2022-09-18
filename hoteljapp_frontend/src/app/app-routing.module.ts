import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './roles/form.component';
import { RolesComponent } from './roles/roles.component';
import { FormPisoComponent } from './pisos/form-piso.component';
import { PisosComponent } from './pisos/pisos.component';
//import { ServiciosComponent } from './servicios/servicios.component';
//import { FormServicioComponent } from './servicios/form-servicio.component';
import { TipoHabitacionesComponent } from './tipo-habitaciones/tipo-habitaciones.component';
import { FormTipoHabitacionComponent } from './tipo-habitaciones/form-tipo-habitacion.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { ReservasComponent } from './reservas/reservas.component';
import { RegistrosComponent } from './registros/registros.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './usuarios/login.component';
import { HistorialComponent } from './reservas/historial.component';

const routes: Routes = [
  {path: '',redirectTo: '/home', pathMatch: 'full'},
  {path: 'home',component: HomeComponent},
  
  {path: 'roles',component: RolesComponent},
  {path: 'roles/form',component: FormComponent}, 
  {path: 'roles/form/:id',component: FormComponent},
  
  {path: 'pisos',component: PisosComponent},
  {path: 'pisos/form-piso',component: FormPisoComponent}, 
  {path: 'pisos/form-piso/:id',component: FormPisoComponent},

  {path: 'tipoHabitaciones',component: TipoHabitacionesComponent},
  {path: 'tipo-habitaciones/form-tipo-habitacion',component: FormTipoHabitacionComponent}, 
  {path: 'tipo-habitaciones/form-tipo-habitacion/:id',component: FormTipoHabitacionComponent},

  {path: 'habitaciones',component: HabitacionesComponent},

  {path: 'reservas',component: ReservasComponent},

  {path: 'registros',component: RegistrosComponent},

  {path: 'clientes',component: ClientesComponent},

  {path: 'login',component: LoginComponent},

  {path: 'historial',component: HistorialComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
