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

  title: string = 'Iniciar Sesión';
  
  usuario: Usuario 
  
  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario
  }
  
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) this.router.navigate(['/home'])
  }
  
  login(): void {
  
    if(this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error', 'Username o password vacíos', 'error')
      return
    }
    this.authService.login(this.usuario).subscribe(
      response => {

        this.authService.guardarUsuario(response.access_token)
        this.authService.guardarToken(response.access_token)
        let usuario = this.authService.usuario

        Swal.fire('Listo',`Hola ${usuario.username} has iniciado sesión con exito!`,'success')

        if (this.authService.hasRole('ROLE_ADMIN')) {
          this.router.navigate(['/home'])
        }
        else {
          this.router.navigate(['/registros'])
        }
      }, err => {
        if(err.status == 400) Swal.fire('Error','Usuario o contraseña incorrectos','error')
      }
    )
  }
 }
