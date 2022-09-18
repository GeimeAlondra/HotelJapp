import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Piso } from './piso';

@Injectable({
  providedIn: 'root'
})
export class PisoService {

  private urlEndPoint: string = 'http://localhost:8080/api/pisos';
  private httpHeaders: HttpHeaders = new HttpHeaders({'content-type':'application/json'});


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

  getAll():Observable<Piso[]>{
    return this.http.get<Piso[]>(this.urlEndPoint, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAuthorized(e);
        return throwError(()=> e);
      })
    );
  }

  //Crear piso
  create(piso: Piso): Observable<any>{
    return this.http.post(this.urlEndPoint, piso, {headers: this.addAuthorizationHeader()}).pipe(
      //map((response: any) => response.rol as Rol),
      catchError(e => {
        if(this.isNoAuthorized(e)){
          return throwError(() => e);
        }
        if(e.status == 400){
          return throwError(() => e)
        }
        if(e.status == 409){
          Swal.fire('Advertencia',"Ya existe un piso con ese nombre en la base de datos",'warning');
        }
        console.log(e.message);
        return throwError(() => e)
      })
    )
  }

  //Obtener piso
  getPiso(id: any): Observable<Piso>{
    return this.http.get<Piso>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizationHeader()}).pipe(
     catchError(e => {
      if(this.isNoAuthorized(e)){
        return throwError(() => e);
      }
      this.router.navigate(['/pisos'])
      console.log(e.message);
      return throwError(() => e)
     })
    )
  }

  //Actualizar piso
  update(piso: Piso): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${piso.id}`, piso, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAuthorized(e)){
          return throwError(() => e);
        }
        if(e.status == 400){
          return throwError(() => e)
        }
        console.log(e.message);
        return throwError(() => e)
      })
    )
  }

  //Eliminar piso
  delete(id:number): Observable<Piso>{
    return this.http.delete<Piso>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e =>{
        if(this.isNoAuthorized(e)){
          return throwError(() => e);
        }
        console.log(e.message);
        return throwError(() => e)
      })
    );
  }

}
