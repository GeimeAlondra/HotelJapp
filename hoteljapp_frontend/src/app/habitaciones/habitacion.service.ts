import { Observable, map, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Habitacion } from './habitacion';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private urlEndPoint: string = 'http://localhost:8080/api/habitaciones';
  private httpHeaders: HttpHeaders = new HttpHeaders({'content-type':'multipart/form-data'});
  private headers2: HttpHeaders = new HttpHeaders({'content-type':'application/json'});

  constructor(private http: HttpClient, private router: Router) { }
  
  getAllActivos():Observable<Habitacion[]>{
    return this.http.get<Habitacion[]>(this.urlEndPoint+'/activos');
  }

  getAllInactivos():Observable<Habitacion[]>{
    return this.http.get<Habitacion[]>(this.urlEndPoint+'/inactivos');
  }

  create(habitacion: Habitacion): Observable<any>{
    return this.http.post(`${this.urlEndPoint}`,habitacion).pipe(
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
    //Cambiar estado
    changeState(estado: string, habitacion:Habitacion) : Observable<any>{
      return this.http.put<any>(`${this.urlEndPoint}/change-state?estado=${estado}`,
      habitacion,{headers: this.headers2}).pipe(
        catchError(e => {
          console.log(e.message);
          return throwError(() => e)
        })
      );
    }
    update(habitacion: Habitacion, id:number): Observable<any>{
      return this.http.put(`${this.urlEndPoint}/${id}`,habitacion).pipe(
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


