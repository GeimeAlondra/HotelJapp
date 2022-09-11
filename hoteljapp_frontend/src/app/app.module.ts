import { LOCALE_ID, NgModule } from '@angular/core';
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
import { FormServicioComponent } from './servicios/form-servicio.component';
import { FormTipoHabitacionComponent } from './tipo-habitaciones/form-tipo-habitacion.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { ReservasComponent } from './reservas/reservas.component';

//Import for table CRUD
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import {DataViewModule} from 'primeng/dataview';
import { RippleModule } from 'primeng/ripple';
import {OrderListModule} from 'primeng/orderlist';

import { registerLocaleData } from '@angular/common';
import localES from '@angular/common/locales/es-SV';
import { RegistrosComponent } from './registros/registros.component';

registerLocaleData (localES, 'es-SV')


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
    TipoHabitacionesComponent,
    FormServicioComponent,
    FormTipoHabitacionComponent,
    HabitacionesComponent,
    ReservasComponent,
    RegistrosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CheckboxModule,
    DataViewModule,
    RippleModule,
    OrderListModule
  ],
  providers: [MessageService, ConfirmationService, {provide: LOCALE_ID, useValue: 'es-SV'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
