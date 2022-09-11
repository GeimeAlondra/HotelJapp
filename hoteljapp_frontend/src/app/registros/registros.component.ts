import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { DetalleReserva } from '../reservas/detalleReserva';
import { Reserva } from '../reservas/reserva';
import { Habitacion } from '../habitaciones/habitacion';
import { Cliente } from '../clientes/cliente';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ReservaService } from '../reservas/reserva.service';
import { HabitacionService } from '../habitaciones/habitacion.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class RegistrosComponent implements OnInit {
sortKey: any;
onSortChange($event: any) {
throw new Error('Method not implemented.');
}

  habitaciones: Habitacion[];
 
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

  constructor(private habitacionService: HabitacionService, private primeNGConfig: PrimeNGConfig, private messageService: MessageService,private confirmationService: ConfirmationService, private reservaService: ReservaService) { }

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
  
  getEventValue($event:any): string{
    return $event.target.value;
  }

  addToReservation(habitacion: Habitacion, $event: MouseEvent): void {
    this.detalle.push({
      habitacion: Habitacion,
      reserva: {},
    } as DetalleReserva);
    this.reserva.detalleReserva = this.detalle;
    let precio = 0;
    this.reserva.detalleReserva.forEach((or) => {
      if (habitacion > 0) {
        precio += habitacion.precio;
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
      message: '¿Está seguro de confirmar la reservación?',
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
  }
});

}

}
