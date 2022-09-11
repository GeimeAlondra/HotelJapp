import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Reserva } from './reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private urlEndPoint: string = 'http://localhost:8080/api/reservas';
  private httpHeaders: HttpHeaders = new HttpHeaders({'content-type':'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getAllRecibidas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlEndPoint);
  }

  getAllAceptadas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlEndPoint + '/aceptadas');
  }

  getAllCanceladas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlEndPoint + '/canceladas');
  }

  changeState(estado:string, reserva:Reserva): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/change-state?estado=${estado}`,reserva,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.message);
        return throwError(() => e)
      })
    );
  }

  createReservationCustomers(reserva: Reserva): Observable<any>{
    return this.http.post(`${this.urlEndPoint}`, reserva).pipe(
      catchError(e => {
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
