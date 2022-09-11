import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders: HttpHeaders = new HttpHeaders({'content-type': 'application/json'});
 

  constructor(private http: HttpClient, private router: Router) { }

  getAll():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente): Observable<any>{
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
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
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
     catchError(e => {
      this.router.navigate(['/clientes'])
      console.log(e.message);
      return throwError(() => e)
     })
    )
  }

  //Actualizar piso
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
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
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.log(e.message);
        return throwError(() => e)
      })
    );
  }
}
