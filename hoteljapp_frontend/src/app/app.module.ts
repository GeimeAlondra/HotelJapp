import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './roles/form.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

import { RolesComponent } from './roles/roles.component';
import { PisosComponent } from './pisos/pisos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { TipoHabitacionesComponent } from './tipo-habitaciones/tipo-habitaciones.component';

/*
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ReservasComponent } from './reservas/reservas.component';
*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FormComponent,
    RolesComponent,
    PisosComponent,
    ServiciosComponent,
    TipoHabitacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
