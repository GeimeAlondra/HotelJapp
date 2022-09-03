import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Servicio } from './servicio';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'app-form-servicio',
  templateUrl: './form-servicio.component.html',
  styleUrls: ['./form-servicio.component.css']
})
export class FormServicioComponent implements OnInit {

  public servicio: Servicio = new Servicio();
  public title: string = "Registrar servicio";
  
  errors: string[];

  constructor(private servicioService: ServicioService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarServicio();
  }

  cargarServicio(): void{
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.servicioService.getServicio(id).subscribe((servicio) => this.servicio = servicio);
      }
    });
  }

  create(): void{
    this.servicioService.create(this.servicio)
    .subscribe({
      next: (json) => {
        this.router.navigate(['servicios'])
        Swal.fire('Nuevo servicio',`${json.message}: ${json.piso.nombre}`,'success')
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+err.status);
        console.log(err.message);
      }
    })
  }

  update(): void{
    this.servicioService.update(this.servicio)
    .subscribe({
      next: (servicio) => {
        this.router.navigate(['servicios']),
        Swal.fire('Excelente','Servicio actualizado con exito','success')
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+err.status);
        console.log(err.message);
      }
    })
  }

}
