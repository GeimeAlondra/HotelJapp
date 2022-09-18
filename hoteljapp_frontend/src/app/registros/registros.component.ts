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
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class RegistrosComponent implements OnInit {

  habitaciones: Habitacion[];

  //clientes: Cliente[];

  CurrentDate = new Date()
 
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  
  submitted: boolean;

  detalleReservaDialog: boolean = false;

  title: string;

  r: any;

  reserva: Reserva = new Reserva();

  detalle: DetalleReserva[] = [];

  cliente: Cliente = {id:1,nombre:"Miguel Ardon",telefono:"60697081", direccion:"La Palma"}

  constructor(private reservaService: ReservaService, 
    private habitacionService: HabitacionService, private primeNGConfig: PrimeNGConfig,
     private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.habitacionService.getAllActivos().subscribe((
      response) => {
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

  addToReservation(habitacion: Habitacion, dia: number, $event: MouseEvent): void {
    this.detalle.push({
      dia: dia,
      habitacion: habitacion,
      reserva: {},
    } as DetalleReserva);
    this.reserva.detalleReserva = this.detalle;
    this.reserva.total = this.calcTotal();
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

  calcTotal(): number {
    let total = 0;
    this.reserva.detalleReserva.forEach((r) => {
      if (r.dia > 0) {
        total += r.habitacion.precio * r.dia;
      }
    });
    return total;
  }

 quitarItem(item):void{
 let index = this.reserva.detalleReserva.indexOf(item);
 this.reserva.detalleReserva.splice(index,1);
 this.reserva.total = this.calcTotal();
  }
  
  saveReservation(): void{

    this.confirmationService.confirm({
      message: '¿Está seguro de confirmar la reserva?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.submitted = true;
        this.reservaService.createReservationCustomers(this.reserva).subscribe({
        next:(json) =>{
          this.messageService.add({severity:'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
        },
     error: (err) => {
       this.messageService.add({severity:'error', summary: 'resultado', detail: `${err.message}`, life: 3000});
       console.log('code status: ' + err.status);
       console.log(err.message);
     }
   })
   this.detalleReservaDialog = false;
   this.reserva.detalleReserva = [];
   }
 });
}




}
