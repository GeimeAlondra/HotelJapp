import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { DetalleReserva } from '../reservas/detalleReserva';
import { Reserva } from '../reservas/reserva';
import { Habitacion } from '../habitaciones/habitacion';
import { Servicio } from '../servicios/servicio';
import { DetalleServicio } from '../reservas/detalleServicio';
import { Cliente } from '../clientes/cliente';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ReservaService } from '../reservas/reserva.service';
import { HabitacionService } from '../habitaciones/habitacion.service';
import { ServicioService } from '../servicios/servicio.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class RegistrosComponent implements OnInit {

  habitaciones: Habitacion[];
  servicios: Servicio[];
  sortOptions: SelectItem[];

  
  submitted: boolean;

  sortOrder: number;

  sortField: string;

  detalleReservaDialog: boolean;

  title: string;

  r: any;

  reserva: Reserva = new Reserva();

  detalle: DetalleReserva[] = [];

  cliente: Cliente = {id:1,nombre:"Lupita Jimenez",telefono:"78564324", direccion:"La Palma"}

  constructor(private habitacionService: HabitacionService, private servicioService: ServicioService,private primeNGConfig: PrimeNGConfig, private messageService: MessageService,private confirmationService: ConfirmationService, private reservaService: ReservaService) { }

  ngOnInit(): void {

    this.habitacionService.getAllActivos().subscribe(
      response=>{
        this.habitaciones = response as Habitacion[];
      }
    );
    this.reserva.cliente = this.cliente;
    this.reserva.fecha_registro = new Date();
    console.log(this.reserva);
  }

  ngOnInit2(): void{

    this.servicioService.getAll().subscribe(
      response=>{
        this.servicios= response as Servicio[];
      }
    );
    this.reserva.cliente = this.cliente;
    this.reserva.fecha_registro = new Date();
    console.log(this.reserva);
  }
  
  getEventValue($event:any): string{
    return $event.target.value;
  }

  addToReservation(habitacion: Habitacion, servicio: Servicio, $event: MouseEvent): void {
    this.detalle.push({
      habitacion: Habitacion,
      servicio: Servicio,
      reserva: {},
    } as DetalleReserva);
    this.reserva.detalleReserva = this.detalle;
    let precio = 0;
    this.reserva.detalleReserva.forEach((or) => {
      if (habitacion > 0) {
        precio += habitacion.precio + servicio.precio;
      }
    });
    this.reserva.total = precio;
    precio = 0;
    console.log(this.reserva);
    ($event.target as HTMLButtonElement).disabled = true;
    console.log(this.cliente);
  }

  hideDialog(): void{
    this.detalleReservaDialog = false;
    this.submitted = false;
  }
  
  verDetalleReserva(){
    this.detalleReservaDialog = true;
    this.title = "Detalle de la reserva";
  }
  calcTotal():number{
    let totalReserva:number = 0;
    if(this.reserva.detalleReserva.length>0){
      this.detalle.forEach(element => {
        totalReserva += (element.habitacion.precio);
      });
    }
    return totalReserva;
  }

  quitarItem(item):void{
 let index = this.reserva.detalleReserva.indexOf(item);
 this.reserva.detalleReserva.splice(index,1);
 this.reserva.total = this.calcTotal();
  }

  saveReservation(){
    this.confirmationService.confirm({
      message: '¿Está seguro de confirmar la reservacion?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    this.submitted = true;
    this.reservaService.createReservationCustomers(this.reserva).subscribe({
     next:(json) =>{
       this.messageService.add({severity:'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
       console.log(this.reserva);
     },
     error: (err) => {
       this.messageService.add({severity:'error', summary: 'resultado', detail: `${err.message}`, life: 3000});
       console.log('code status: ' + err.status)
       console.log(err.message)
     }
   })
   this.detalleReservaDialog = false;
   this.detalle = [];
   this.reserva.detalleReserva = [];
   this.reserva.detalleServicio = [];
  }
});

}

}
