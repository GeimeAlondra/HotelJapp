import  Swal  from 'sweetalert2';
import { TipoHabitacionService } from '../tipo-habitaciones/tipo-habitacion.service';
import { PisoService } from '../pisos/piso.service';
import { TipoHabitacion } from '../tipo-habitaciones/tipo-habitacion';
import { Piso } from '../pisos/piso';
import { Habitacion } from './habitacion';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HabitacionService } from './habitacion.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./habitaciones.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class HabitacionesComponent implements OnInit {

  tipoHabitaciones: TipoHabitacion[];
  pisos: Piso[];
  habitaciones: Habitacion[];

  tipoHabitacionSelected: TipoHabitacion;
  pisoSelected: Piso;
  habitacion: Habitacion;

  submitted: boolean;

  habitacionDialog: boolean;

  title: string;

  errors: string[];

  checked: boolean = false;

  selectedProducts: Habitacion[];


  private imagen: File;
  estado: string;
  indexEdited: number = -1;

  constructor(private habitacionService: HabitacionService,private tipoHabitacionService: TipoHabitacionService,private pisoService: PisoService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getActivos();
    this.gettipoHabitaciones();
    this.getPisos();
  }

  getActivos(): void{
    this.habitacionService.getAllActivos().subscribe(
      response => {
        console.log(response);
        this.habitaciones = response as Habitacion[];
      }
    );
  }

  getInactivos(): void{
    this.habitacionService.getAllInactivos().subscribe(
      response => {
        console.log(response);
        this.habitaciones = response as Habitacion[];
      }
    );
  }

  gettipoHabitaciones(): void{
    this.tipoHabitacionService.getAll().subscribe(
      response => {
        console.log(response);
        this.tipoHabitaciones = response as TipoHabitacion[];
      }
    );
  }

    getPisos(): void{
      this.pisoService.getAll().subscribe(
        response => {
          console.log(response);
          this.pisos = response as Piso[];
        }
      );
  }

  openNew() {
    this.habitacion = {};
     this.submitted = false;
     this.habitacionDialog = true;
     this.title = "Nueva habitacion"
 }
 hideDialog() {
   this.habitacionDialog = false;
   this.submitted = false;
}

editProduct(habitacion: Habitacion) {
  this.tipoHabitacionSelected = habitacion.tipoHabitacion;
  this.pisoSelected = habitacion.piso;
  this.habitacion = {...habitacion};
  this.habitacionDialog = true;
  this.title = "Actualizar habitacion";
  this.indexEdited = this.habitaciones.indexOf(habitacion);
}

createFormData(): FormData{
  let formData = new FormData();
  if(this.imagen == null){
  if(this.habitacion.id == null){
  this.habitacion.imagen = null;
  formData.append("imagen",null);
  }
  }else{
    formData.append("imagen",this.imagen);
  }
  formData.append("habitacion",
  new Blob([JSON.stringify(this.habitacion)],{type:"application/json"})
  );
  return formData;
} 
   
create():void{
  this.submitted = true;
this.habitacionService.create(this.createFormData() as Habitacion).subscribe({
  next:(json) =>{
    this.habitaciones.unshift(json.habitacion);
    this.messageService.add({severity:'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
  },
  error: (err) => {
    this.messageService.add({severity:'error', summary: 'resultado', detail: `${err.message}`, life: 3000});
    console.log('code status: ' + err.status)
    console.log(err.message)
  }
})
  this.habitacionDialog = false;
this.habitacion = {};
this.imagen = null;
}

update():void{
  this.submitted = true;
  let id = this.habitacion.id;
this.habitacionService.update(this.createFormData() as Habitacion,id).subscribe({
  next: (json) =>{
    Object.assign(this.habitaciones[this.indexEdited],json.habitacion);
    this.messageService.add({severity:'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
  },
  error: (err) => {
    //this.errors = err.message as string[];
    this.messageService.add({severity:'error', summary: 'resultado', detail: `${err.message}`, life: 3000});
    console.log('code status: ' + err.status)
    console.log(err.message)
  }
})
  this.habitacionDialog = false;
this.habitacion = {};
this.imagen = null;
}
 
deleteProduct(estado: string, habitacion: Habitacion) {
  this.confirmationService.confirm({
      message: '¿Está seguro de deshabilitar ' + habitacion.nombre + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.habitacionService.changeState(estado, habitacion).subscribe({
          next: (response) => {
          this.habitaciones = this.habitaciones.filter(val => val.id !== habitacion.id);
          this.habitacion = {...habitacion};
          this.messageService.add({severity:'success', summary: 'Confirmado', detail: 'El estado de la habitacion ha sido cambiado a Inactiva', life: 3000});
      },
      error : (err) =>{
        this.messageService.add({severity:'error', summary: 'Resultado', detail: `${err.message}`});
        console.log('Code status: ' + err.status)
        console.log(err.message)
      }
    }
      );
    }
  });
}

deleteProduct2(estado: string, habitacion: Habitacion) {
  this.confirmationService.confirm({
      message: '¿Está seguro de deshabilitar ' + habitacion.nombre + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.habitacionService.changeState(estado, habitacion).subscribe({
          next: (response) => {
          this.habitaciones = this.habitaciones.filter(val => val.id !== habitacion.id);
          this.habitacion = {...habitacion};
          this.messageService.add({severity:'success', summary: 'Confirmado', detail: 'El estado de la habitacion ha sido cambiado a Activa', life: 3000});
      },
      error : (err) =>{
        this.messageService.add({severity:'error', summary: 'Resultado', detail: `${err.message}`});
        console.log('Code status: ' + err.status)
        console.log(err.message)
      }
    }
      );
    }
  });
}
checkChanged(event){
  if(event)
  this.getInactivos();
  else
  this.getActivos();
}
seleccionarImagen(event){
  this.imagen = event.target.files[0];
  console.log(this.imagen);
}

getEventValue($event:any): string{
  return $event.target.value;
}


}
