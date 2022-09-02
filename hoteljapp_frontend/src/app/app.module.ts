import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormComponent } from './roles/form.component';
import { RolesComponent } from './roles/roles.component';
import { PisosComponent } from './pisos/pisos.component';
import { FormPisoComponent } from './pisos/form-piso.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { TipoHabitacionesComponent } from './tipo-habitaciones/tipo-habitaciones.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FormComponent,
    RolesComponent,
    PisosComponent,
    FormPisoComponent,
    ServiciosComponent,
    TipoHabitacionesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
