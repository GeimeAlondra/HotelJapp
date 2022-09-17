import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Reserva } from './reserva';
//import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private urlEndPoint: string = 'http://localhost:8080/api/reservas';
  private httpHeaders: HttpHeaders = new HttpHeaders({'content-type':'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAuthorized(e): boolean{
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login']);
      return true;
    }
    /*
    if(e.status == 403){
      Swal.fire('Prohibido', `${this.authService.usuario.username} no tiene los permisos necesarios para ingresar a este recurso`, 'warning')
      this.router.navigate(['/home']);
      return true;
    }*/
    return false;
  }

  getAllRecibidas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlEndPoint).pipe(
      catchError(e => {
        this.isNoAuthorized(e);
        return throwError(()=> e);
      })
    );
  }

  getAllAceptadas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlEndPoint + '/aceptadas').pipe(
      catchError(e => {
        this.isNoAuthorized(e);
        return throwError(()=> e);
      })
    );
  }

  getAllCanceladas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlEndPoint + '/canceladas').pipe( 
      catchError(e => {
      this.isNoAuthorized(e);
      return throwError(()=> e);
    }));
  }

  changeState(estado:string, reserva:Reserva): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/change-state?estado=${estado}`,reserva,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(this.isNoAuthorized(e)){
          return throwError(() => e);
        }
        console.log(e.message);
        return throwError(() => e)
      })
    );
  }

  createReservationCustomers(reserva: Reserva): Observable<any>{
    return this.http.post(`${this.urlEndPoint}`, reserva).pipe(
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
