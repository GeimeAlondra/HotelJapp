import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Rol } from './rol';
import { RolService } from './rol.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {

  roles: Rol[];

  constructor(private rolService: RolService) { }

  ngOnInit(): void {

    this.rolService.getAll().subscribe(
      response => {
        this.roles = response as Rol[];
      }
    );
  }

delete(rol: Rol){

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: '¿Esta seguro/a?',
    text: `¿Seguro que desea eliminar el rol ${rol.nombre}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.rolService.delete(rol.id).subscribe(
        response => {
          this.roles = this.roles.filter(rol => rol !== rol);

          swalWithBootstrapButtons.fire(
            'Categoria eliminada!',
            //response.message,
            'success'
          )
        }
      )
    } 
  })
 
}

}
