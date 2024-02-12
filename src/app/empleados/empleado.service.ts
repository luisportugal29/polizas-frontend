import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Empleado } from '../polizas/interfaces/empleado.interface';
import { Response } from '../intefaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Response>(`${this.API_URL}/empleados`)
    .pipe(map(response => response.data));
  }
}
