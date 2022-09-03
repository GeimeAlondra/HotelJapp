import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoHabitacion } from './tipo-habitacion';
import { TipoHabitacionService } from './tipo-habitacion.service';

@Component({
  selector: 'app-form-tipo-habitacion',
  templateUrl: './form-tipo-habitacion.component.html',
  styleUrls: ['./form-tipo-habitacion.component.css']
})
export class FormTipoHabitacionComponent implements OnInit {

  public tipoHabitacion: TipoHabitacion = new TipoHabitacion();
  public title: string = "Registrar tipo de habitación";
  
  errors: string[];

  constructor(private tipoHabitacionService: TipoHabitacionService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarTipoHabitacion();
  }

  cargarTipoHabitacion(): void{
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.tipoHabitacionService.getServicio(id).subscribe((tipoHabitacion) => this.tipoHabitacion = tipoHabitacion);
      }
    });
  }

  create(): void{
    this.tipoHabitacionService.create(this.tipoHabitacion)
    .subscribe({
      next: (json) => {
        this.router.navigate(['tipoHabitaciones'])
        Swal.fire('Nuevo tipo de habitación',`${json.message}: ${json.piso.nombre}`,'success')
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+err.status);
        console.log(err.message);
      }
    })
  }

  update(): void{
    this.tipoHabitacionService.update(this.tipoHabitacion)
    .subscribe({
      next: (tipoHabitacion) => {
        this.router.navigate(['tipoHabitaciones']),
        Swal.fire('Excelente','Tipo de habitación actualizado con exito','success')
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+err.status);
        console.log(err.message);
      }
    })
  }

}
