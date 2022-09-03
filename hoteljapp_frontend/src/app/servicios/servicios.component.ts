import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Servicio } from './servicio';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})

export class ServiciosComponent implements OnInit {

  servicios: Servicio[];

  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {

    this.servicioService.getAll().subscribe(
      response => {
        this.servicios = response as Servicio[];
      }
    );
  }

  delete(servicio: Servicio){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Eliminar servicio',
      text: `El registro ${servicio.nombre} se eliminará de forma permanente, ¿Está seguro/a de realizar la acción?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioService.delete(servicio.id).subscribe(
          response => {
          this.servicios = this.servicios.filter(serv => serv !== servicio);
          swalWithBootstrapButtons.fire(
            '¡Servicio eliminado con exito!',
             response.message,
            'success'
          )
          }
        )
      }
      })
    }

}