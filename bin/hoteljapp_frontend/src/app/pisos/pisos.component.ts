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

  errors: string[];


  constructor(private pisoService: PisoService, private router: Router, private activeRoute: ActivatedRoute,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.pisoService.getAll().subscribe(
      response => {
        this.pisos = response as Piso[];
      }
    );

  }

  delete(piso: Piso){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Eliminar piso',
      text: `El registro ${piso.nombre} se eliminará de forma permanente, ¿Está seguro/a de realizar la acción?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.pisoService.delete(piso.id).subscribe(
          response => {
          this.pisos = this.pisos.filter(p => p !== piso);
          swalWithBootstrapButtons.fire(
            '¡Piso eliminado con exito!',
             response.message,
            'success'
          )
          }
        )
      }
      })
    }
}

         

