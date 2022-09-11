import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./clientes.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  cliente: Cliente;

  submitted: boolean;

  clienteDialog: boolean;

  title: string;

  errors: string[];

  //selectedProducts: Cliente[];

  indexEdited: number = -1;



  constructor(private clienteService: ClienteService, private messageService: MessageService,private confirmationService: ConfirmationService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.clienteService.getAll().subscribe(
      response => {
        this.clientes = response as Cliente[];
      }
    );
  }
  openNew() {
    this.cliente = {};
     this.submitted = false;
     this.clienteDialog = true;
     this.title = "Nuevo cliente"
 }
 hideDialog() {
   this.clienteDialog = false;
   this.submitted = false;
}

editProduct(cliente: Cliente) {
  this.cliente = {...cliente};
  this.clienteDialog = true;
  this.title = "cliente";
  this.indexEdited = this.clientes.indexOf(cliente);
}

  create(): void{
    this.clienteService.create(this.cliente)
    .subscribe({
      next: (json) => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente',`${json.message}: ${json.cliente.nombre}`,'success')
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+err.status);
        console.log(err.message);
      }
    })
  }

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe({
      next: (cliente) => {
        this.router.navigate(['/clientes']),
        Swal.fire('Excelente','Cliente actualizado con exito','success')
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+err.status);
        console.log(err.message);
      }
    })
  }


  delete(cliente: Cliente){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Eliminar cliente',
      text: `El registro ${cliente.nombre} se eliminará de forma permanente, ¿Está seguro/a de realizar la acción?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
          this.clientes = this.clientes.filter(clt => clt !== cliente);
          swalWithBootstrapButtons.fire(
            'success',
            '¡Cliente eliminado con exito!',
            'success'
          )
          }
        )
      }
      })
    }

  }
