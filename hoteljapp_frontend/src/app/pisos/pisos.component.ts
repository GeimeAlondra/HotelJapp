import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Piso } from './piso';
import { PisoService } from './piso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pisos',
  templateUrl: './pisos.component.html',
  styleUrls: ['./pisos.component.css']
})
export class PisosComponent implements OnInit {

  public piso: Piso = new Piso();
  pisos: Piso[];
  checked: boolean= false;
  estado: string;

  constructor(private pisoService: PisoService, private router: Router, private activeRoute: ActivatedRoute,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getActivos();
    this.getPisos();
   
  }

  getActivos(): void{
    this.pisoService.getAllActivos().subscribe(
      response =>{
        console.log(response);
        this.pisos = response as Piso[];
      }
    );
  }

  getInactivos(): void{
    this.pisoService.getAllInactivos().subscribe(
      response =>{
        console.log(response);
        this.pisos = response as Piso[];
      }
    );
  }

  getPisos(): void{
    this.pisoService.getAll().subscribe(
      response =>{
        console.log(response);
        this.pisos = response as Piso[];
      }
    );
  }

  deleteProduct(estado: string, piso: Piso) {
    this.confirmationService.confirm({
        message: 'Esta seguro/a de desactivar ' + piso.nombre + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.pisoService.changeState(estado,piso).subscribe({
            next: (response) =>{
              this.pisos = this.pisos.filter(val => val.id !== piso.id);
              this.piso = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Producto cambiado a estado I', life: 3000});
            },
            error: (err) =>{
              this.messageService.add({severity:'error', summary: 'Resultado', detail: `${err.message}}`});
              console.log('code status: ' + err.status);
              console.log(err.message);
            }
          })
           
        }
    });

    checkChanged(event){
      if(event)
      this.getInactivos();
      else
      this.getActivos();
     }

}
}


