import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { PisosComponent } from './pisos/pisos.component';
import { RolesComponent } from './roles/roles.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ReservasComponent } from './reservas/reservas.component';
import { TipoHabitacionesComponent } from './tipo-habitaciones/tipo-habitaciones.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiciosComponent,
    PisosComponent,
    RolesComponent,
    HabitacionesComponent,
    ClientesComponent,
    ReservasComponent,
    TipoHabitacionesComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
