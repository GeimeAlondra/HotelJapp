import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TipoHabitacion } from './tipo-habitacion';
import { TipoHabitacionService } from './tipo-habitacion.service';

@Component({
  selector: 'app-tipo-habitaciones',
  templateUrl: './tipo-habitaciones.component.html',
  styleUrls: ['./tipo-habitaciones.component.css']
})
export class TipoHabitacionesComponent implements OnInit {

  tipoHabitaciones: TipoHabitacion[];

  constructor(private tipoHabitacionService: TipoHabitacionService) { }

  ngOnInit(): void {

    this.tipoHabitacionService.getAll().subscribe(
      response => {
        this.tipoHabitaciones = response as TipoHabitacion[];
      }
    );
  }

  delete(tipoHabitacion: TipoHabitacion){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Eliminar Tipo de Habitación',
      text: `El registro ${tipoHabitacion.nombre} se eliminará de forma permanente, ¿Está seguro/a de realizar la acción?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoHabitacionService.delete(tipoHabitacion.id).subscribe(
          response => {
          this.tipoHabitaciones = this.tipoHabitaciones.filter(tph => tph !== tipoHabitacion);
          swalWithBootstrapButtons.fire(
            '¡Tipo de habitacion eliminado con exito!',
             response.message,
            'success'
          )
          }
        )
      }
      })
    }

}
