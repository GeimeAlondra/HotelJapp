import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Rol } from './rol';

@Injectable({
  providedIn: 'root'
})

export class RolService {

  private urlEndPoint: string = 'http://localhost:8080/api/roles';
  private httpHeaders: HttpHeaders = new HttpHeaders({'content-type':'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getAll(): Observable<Rol[]>{
      return this.http.get<Rol[]>(this.urlEndPoint);
  }

  //Crear rol
  create(rol: Rol): Observable<any>{
    return this.http.post(this.urlEndPoint, rol, {headers: this.httpHeaders}).pipe(
      //map((response: any) => response.rol as Rol),
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e)
        }
        if(e.status == 409){
          Swal.fire('Advertencia',"Ya existe un rol con ese nombre en la base de datos",'warning');
        }
        console.log(e.message);
        return throwError(() => e)
      })
    )
  }

  //Obtener rol
  getRol(id: any): Observable<Rol>{
    return this.http.get<Rol>(`${this.urlEndPoint}/${id}`).pipe(
     catchError(e => {
      this.router.navigate(['/roles'])
      console.log(e.message);
      return throwError(() => e)
     })
    )
  }

  //Actualizar rol
  update(rol: Rol): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${rol.id}`, rol, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(() => e)
        }
        console.log(e.message);
        return throwError(() => e)
      })
    )
  }

  //Eliminar rol
  delete(id:number): Observable<Rol>{
    return this.http.delete<Rol>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.log(e.message);
        return throwError(() => e)
      })
    );
  }


  
}