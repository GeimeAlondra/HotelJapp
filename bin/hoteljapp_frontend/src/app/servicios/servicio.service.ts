import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Servicio } from './servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private urlEndPoint: string = 'http://localhost:8080/api/servicios';
  private httpHeaders: HttpHeaders = new HttpHeaders({'content-type':'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getAll(): Observable<Servicio[]>{
      return this.http.get<Servicio[]>(this.urlEndPoint);
  }

  //Crear servicio
  create(servicio: Servicio): Observable<any>{
    return this.http.post(this.urlEndPoint, servicio, {headers: this.httpHeaders}).pipe(
      //map((response: any) => response.rol as Rol),
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e)
        }
        if(e.status == 409){
          Swal.fire('Advertencia',"Ya existe un servicio con ese nombre en la base de datos",'warning');
        }
        console.log(e.message);
        return throwError(() => e)
      })
    )
  }

  //Obtener servicio
  getServicio(id: any): Observable<Servicio>{
    return this.http.get<Servicio>(`${this.urlEndPoint}/${id}`).pipe(
     catchError(e => {
      this.router.navigate(['/servicios'])
      console.log(e.message);
      return throwError(() => e)
     })
    )
  }

  //Actualizar servicio
  update(servicio: Servicio): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${servicio.id}`, servicio, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e)
        }
        console.log(e.message);
        return throwError(() => e)
      })
    )
  }

  //Eliminar servicio
  delete(id:number): Observable<Servicio>{
    return this.http.delete<Servicio>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.log(e.message);
        return throwError(() => e)
      })
    );
  }


  
}