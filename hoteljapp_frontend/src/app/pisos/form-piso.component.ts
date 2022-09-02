import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Piso } from './piso';
import { PisoService } from './piso.service';

@Component({
  selector: 'app-form-piso',
  templateUrl: './form-piso.component.html',
  styleUrls: ['./form-piso.component.css']
})
export class FormPisoComponent implements OnInit {

  public piso: Piso = new Piso();
  public title: string = "Registrar piso";
  
  errors: string[];

  constructor(private pisoService: PisoService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPiso();
  }

  cargarPiso(): void{
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.pisoService.getPiso(id).subscribe((piso) => this.piso = piso);
      }
    });
  }

  create(): void{
    this.pisoService.create(this.piso)
    .subscribe({
      next: (json) => {
        this.router.navigate(['pisos'])
        Swal.fire('Nuevo piso',`${json.message}: ${json.piso.nombre}`,'success')
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+err.status);
        console.log(err.message);
      }
    })
  }

  update(): void{
    this.pisoService.update(this.piso)
    .subscribe({
      next: (piso) => {
        this.router.navigate(['pisos']),
        Swal.fire('Excelente','Piso actualizado con exito','success')
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+err.status);
        console.log(err.message);
      }
    })
  }


  
}
