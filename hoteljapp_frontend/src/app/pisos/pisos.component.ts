import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Piso } from './piso';
import { PisoService } from './piso.service';

@Component({
  selector: 'app-pisos',
  templateUrl: './pisos.component.html',
  styleUrls: ['./pisos.component.css']
})
export class PisosComponent implements OnInit {

  pisos: Piso[];

  constructor(private pisoService: PisoService) { }

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
      title: 'Eliminar rol',
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
          this.pisos = this.pisos.filter(piso => piso !== piso);
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
