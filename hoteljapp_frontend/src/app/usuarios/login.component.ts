import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = "Iniciar sesión";
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login(): void{

    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error', 'Debe ingresar un usuario y contraseña', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
     console.log(response);
     let payLoad = JSON.parse(window.atob(response.access_token.split(".")[1]));
     console.log(payLoad);
     this.router.navigate(['/home']);
     Swal.fire('Aviso', `Hola ${response.username} has iniciado sesión con éxito!!!`, 'success');
    });



  }
  


  

}
