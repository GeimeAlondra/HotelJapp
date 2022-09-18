import { Observable, map, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Habitacion } from './habitacion';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private urlEndPoint: string = 'http://localhost:8080/api/habitaciones';
  private httpHeaders: HttpHeaders = new HttpHeaders();
  //private httpHeaders: HttpHeaders = new HttpHeaders({'content-type':'multipart/form-data'});
  private headers2: HttpHeaders = new HttpHeaders({'content-type':'application/json'});

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  
  addAuthorizationHeaders(image: boolean = false) {
    let token = this.authService.token
    if (image) {
      if (token != null) {
        return this.httpHeaders.append('Authorization', 'Bearer ' + token)
      }
      else {
        return this.httpHeaders
      }
    }
    if (token != null) {
      return this.headers2.append('Authorization', 'Bearer ' + token)
    }
    return this.headers2;
  }

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

  getAllActivos():Observable<Habitacion[]>{
    return this.http.get<Habitacion[]>(this.urlEndPoint+'/activos').pipe(
      catchError(e => {
        this.isNoAuthorized(e);
        return throwError(()=> e);
      })
    );
  }

  getAllInactivos():Observable<Habitacion[]>{
    return this.http.get<Habitacion[]>(this.urlEndPoint+'/inactivos', {headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAuthorized(e);
        return throwError(()=> e);
      })
    );
  }

  create(habitacion: Habitacion): Observable<any>{
    return this.http.post(`${this.urlEndPoint}`,habitacion).pipe(
      catchError(e => {
        if(this.isNoAuthorized(e)){
          return throwError(() => e);
        }
        if(e.status == 400){
          return throwError(()=> e)
        }
        if(e.status == 409){
          console.log(e.message);
        }
        return throwError(() => e)
      })

    )

  }
    //Cambiar estado
    changeState(estado: string, habitacion:Habitacion) : Observable<any>{
      return this.http.put<any>(`${this.urlEndPoint}/change-state?estado=${estado}`,
      habitacion,{headers: this.addAuthorizationHeader()}).pipe(
        catchError(e => {
          if(this.isNoAuthorized(e)){
            return throwError(() => e);
          }
          if(e.status == 400){
            return throwError(()=> e)
          }
          console.log(e.message);
          return throwError(() => e)
        })
      );
    }
    
    update(habitacion: Habitacion, id:number): Observable<any>{
      return this.http.put(`${this.urlEndPoint}/${id}`,habitacion).pipe(
        catchError(e => {
          if(this.isNoAuthorized(e)){
            return throwError(() => e);
          }
          if(e.status == 400){
            return throwError(()=> e)
          }
          if(e.status == 409){
            console.log(e.message);
          }
          return throwError(() => e)
        })
  
      )
  
    }

}


