import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Poliza } from './interfaces/poliza.interface';
import { Response } from '../intefaces/response.interface';
import { PolizaData } from './interfaces/polizaData.inteface';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {

  private API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getPolizas(): Observable<Poliza[]> {
    return this.http.get<Response>(`${this.API_URL}/polizas`)
    .pipe(map(response => response.data));
  }

  deletePoliza(id: number) {
    return this.http.delete(`${this.API_URL}/polizas/${id}`); 
  }

  savePoliza(poliza: PolizaData): Observable<Poliza> {
    return this.http.post<Response>(`${this.API_URL}/polizas`, poliza)
    .pipe(
      map(response => response.data),
      catchError(({ error: { data} }): Observable<any> =>  {
        return throwError(data.mensaje || data.mensajes);
      })
    );
  }

  updatePoliza(id: number,poliza: PolizaData): Observable<Poliza> {
  
    return this.http.put<Response>(`${this.API_URL}/polizas/${id}`,poliza)
    .pipe(
      map(response => response.data),
      catchError(({ error: { data} }): Observable<any> =>  {
        return throwError(data.mensaje || data.mensajes);
      })
    );
  }


}
