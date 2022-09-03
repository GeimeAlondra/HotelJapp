import { Component, OnInit } from '@angular/core';
//import Swal from 'sweetalert2';
import { Piso } from './piso';
import { PisoService } from './piso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pisos',
  templateUrl: './pisos.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .p-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./pisos.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class PisosComponent implements OnInit {

  public piso: Piso = new Piso();

  pisos: Piso[];

  checked: boolean= false;

  estado: string;

  submitted: boolean;

  errors: string[];

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

  deletePiso(estado: string, piso: Piso) {
    this.confirmationService.confirm({
        message: 'Esta seguro/a de desactivar ' + piso.nombre + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.pisoService.changeState(estado, piso).subscribe({
            next: (response) =>{
              this.pisos = this.pisos.filter(val => val.id !== piso.id);
              this.piso = {...piso};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Piso desactivado', life: 3000});
            },
            error: (err) =>{
              this.messageService.add({severity:'error', summary: 'Resultado', detail: `${err.message}}`});
              console.log('code status: ' + err.status);
              console.log(err.message);
            }
          })
           
        }
    });


  /*  checkChanged(event){
      if(event)
      this.getInactivos();
      else
      this.getActivos();
        }

   getEventValue($event:any): string{
    return $event.target.value;
    }*/
        

  }
}


