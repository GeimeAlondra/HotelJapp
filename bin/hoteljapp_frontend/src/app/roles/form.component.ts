import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from './rol';
import { RolService } from './rol.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public rol: Rol = new Rol();
  public title: string = "Registrar rol";
  
  errors: string[];

  constructor(private rolService: RolService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarRol();
  }

  cargarRol(): void{
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.rolService.getRol(id).subscribe((rol) => this.rol = rol);
      }
    });
  }

  create(): void{
    this.rolService.create(this.rol)
    .subscribe({
      next: (json) => {
        this.router.navigate(['roles'])
        Swal.fire('Nuevo rol',`${json.message}: ${json.rol.nombre}`,'success')
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+err.status);
        console.log(err.message);
      }
    })
  }

  update(): void{
    this.rolService.update(this.rol)
    .subscribe({
      next: (rol) => {
        this.router.navigate(['roles']),
        Swal.fire('Excelente','Rol actualizado con exito','success')
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+err.status);
        console.log(err.message);
      }
    })
  }


  
}