import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Cliente } from '../clientes/cliente';
import { Reserva } from './reserva';
import { ReservaService } from './reserva.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  title: string;
  reservas: Reserva[];
  clientes: Cliente[];
  reserva: Reserva;
  detalleOrdenDialog: boolean = false;
  estado: string;
  errors: string[];
  checked: boolean= false;
  indexEdited: number = -1;
  selectedValue: string = 'val1';
  submitted: boolean;

  constructor(private reservaService: ReservaService, private messageService: MessageService, private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.getRecibidas();
  }

  getRecibidas(): void{
    this.reservaService.getAllRecibidas().subscribe({
      next: (json) =>{
        this.reservas = json as Reserva[];
        console.log(this.reservas);
      },
      error: (err) =>{
        this.messageService.add({severity:'error', summary: 'Resultado', detail: `${err.message}}`});
        console.log('code status: ' + err.status);
        console.log(err.message);
      }
    });
  }

  getAceptadas(): void{
    this.reservaService.getAllAceptadas().subscribe({
      next: (json) =>{
        this.reservas = json as Reserva[];
        console.log(this.reservas);
      },
      error: (err) =>{
        this.messageService.add({severity:'error', summary: 'Resultado', detail: `${err.message}}`});
        console.log('code status: ' + err.status);
        console.log(err.message);
      }
    });
  }

  getCanceladas(): void{
    this.reservaService.getAllCanceladas().subscribe({
      next: (json) =>{
        this.reservas = json as Reserva[];
        console.log(this.reservas);
      },
      error: (err) =>{
        this.messageService.add({severity:'error', summary: 'Resultado', detail: `${err.message}}`});
        console.log('code status: ' + err.status);
        console.log(err.message);
      }
    });
  }

  changeState(estado: string, reserva: Reserva) {
    let estadoText = estado == 'A' ? 'Aceptar' : 'Cancelar';
    this.confirmationService.confirm({
        message: `Esta seguro/a de ${estadoText} la reserva?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.reservaService.changeState(estado,reserva).subscribe({
            next: (response) =>{
              this.reservas = this.reservas.filter(val => val.id !== reserva.id);
              this.reserva = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Reserva cambiada a estado A', life: 3000});
            },
            error: (err) =>{
              this.messageService.add({severity:'error', summary: 'Resultado', detail: `${err.message}}`});
              console.log('code status: ' + err.status);
              console.log(err.message);
            }
          })
           
        }
    });
 }

}
