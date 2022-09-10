import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { TipoHabitacion } from './tipo-habitacion';

@Injectable({
  providedIn: 'root'
})
export class TipoHabitacionService {

  private urlEndPoint: string = 'http://localhost:8080/api/tipoHabitaciones';
  private httpHeaders: HttpHeaders = new HttpHeaders({'content-type':'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getAll(): Observable<TipoHabitacion[]>{
      return this.http.get<TipoHabitacion[]>(this.urlEndPoint);
  }

  //Crear tipo
  create(servicio: TipoHabitacion): Observable<any>{
    return this.http.post(this.urlEndPoint, servicio, {headers: this.httpHeaders}).pipe(
      //map((response: any) => response.rol as Rol),
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e)
        }
        if(e.status == 409){
          Swal.fire('Advertencia',"Ya existe un tipo de habitación con ese nombre en la base de datos",'warning');
        }
        console.log(e.message);
        return throwError(() => e)
      })
    )
  }

  //Obtener tipo
  getServicio(id: any): Observable<TipoHabitacion>{
    return this.http.get<TipoHabitacion>(`${this.urlEndPoint}/${id}`).pipe(
     catchError(e => {
      this.router.navigate(['/servicios'])
      console.log(e.message);
      return throwError(() => e)
     })
    )
  }

  //Actualizar tipo
  update(tipoHabitacion: TipoHabitacion): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${tipoHabitacion.id}`, tipoHabitacion, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e)
        }
        console.log(e.message);
        return throwError(() => e)
      })
    )
  }

  //Eliminar tipo
  delete(id:number): Observable<TipoHabitacion>{
    return this.http.delete<TipoHabitacion>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.log(e.message);
        return throwError(() => e)
      })
    );
  }
}
