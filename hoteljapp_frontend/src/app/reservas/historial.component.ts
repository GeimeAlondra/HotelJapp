import { Component, OnInit } from '@angular/core';
import { Reserva } from './reserva';
import { ReservaService } from './reserva.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  reservas: Reserva[];
  title: string;
  reserva: Reserva;
  detalleReservaDialog: boolean = false;
  estado: string;
  selectedValue: string = 'val1';
  indexEdited: number = -1;

  constructor(private reservaService: ReservaService, private messageService: MessageService,private confirmationService: ConfirmationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getReservas()
  }
  getReservas(): void{
    this.reservaService.getReservs(this.authService.usuario.id).subscribe({
     next: (json) =>{
         this.reservas = json as Reserva[];
         console.log(this.reserva);
     },
     error : (err) =>{
     this.messageService.add({severity:'error', summary: 'resultado', detail: `${err.message}`});
      console.log('Code status: ' + err.status)
      console.log(err.message)
    }
      });
  }

  hideDialog(): void{
    this.detalleReservaDialog = false;
  }
  
  verDetalleReserva(reserva: Reserva){
    this.reserva = {...reserva};
    this.detalleReservaDialog = true;
    this.title = "Detalle de la orden";
  }
  
    getEventValue($event:any): string{
      return $event.target.value;
    }

}
