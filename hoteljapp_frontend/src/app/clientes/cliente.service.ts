import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders: HttpHeaders = new HttpHeaders({'content-type': 'application/json'});
 

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }  
  private addAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer' + token);
    }
    return this.httpHeaders;
  }
  
  private isNoAuthorized(e): boolean{
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login']);
      return true;
    }
    if(e.status == 403){
      Swal.fire('Prohibido', `${this.authService.usuario.username} no tiene los permisos necesarios para ingresar a este recurso`, 'warning')
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }
  

  getAll():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint, {headers: this.addAuthorizationHeader()}).pipe(
    );
  }

  create(cliente: Cliente): Observable<any>{
    return this.http.post(this.urlEndPoint, cliente, {headers: this.addAuthorizationHeader()}).pipe(
      //map((response: any) => response.rol as Rol),
      catchError(e => {
     
        if(e.status == 400){
          return throwError(() => e)
        }
        if(e.status == 409){
          Swal.fire('Advertencia',"Ya existe un cliente con ese nombre en la base de datos",'warning');
        }
        console.log(e.message);
        return throwError(() => e)
      })
    )
  }
  
  getCliente(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizationHeader()}).pipe(
     catchError(e => {
     
      this.router.navigate(['/clientes'])
      console.log(e.message);
      return throwError(() => e)
     })
    )
  }

  //Actualizar piso
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
       
        if(e.status == 400){
          return throwError(() => e)
        }
        console.log(e.message);
        return throwError(() => e)
      })
    )
  }

  delete(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e =>{
        
        console.log(e.message);
        return throwError(() => e)
      })
    );
  }
}
