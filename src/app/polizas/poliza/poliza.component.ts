import { Component, OnInit } from '@angular/core';
import { PolizaService } from '../poliza.service';
import { EmpleadoService } from 'src/app/empleados/empleado.service';
import { Poliza } from '../interfaces/poliza.interface';
import { MessageService } from 'primeng/api';
import { Empleado } from '../interfaces/empleado.interface';
import { PolizaData } from '../interfaces/polizaData.inteface';

@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.css'],
  providers: [MessageService]
})
export class PolizaComponent implements OnInit{

  polizas: Poliza[];
  empleados: Empleado[];
  showForm: boolean = false;
  selectedPoliza: Poliza;

  constructor(
    private polizaService: PolizaService,
    private empleadoService: EmpleadoService,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.empleadoService.getEmpleados()
    .subscribe({
      next: data => this.empleados = data,
      error: error => console.log(error)

    });
    this.polizaService.getPolizas()
    .subscribe({
      next: data => this.polizas = data,
      error: error => console.log(error)
    });
  }

  deletePoliza(id: number): void {
    this.polizaService.deletePoliza(id)
    .subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Notificación',
          detail: 'Poliza eliminada correctamente'
        });
        this.polizas = this.polizas.filter(poliza => poliza.id !== id);
      },
      error: error => console.log(error)
    });
  }

  handleSave(poliza: PolizaData): void {
    console.log(poliza);
    const succesMessage = {
      severity: 'success',
      summary: 'Notificación',
      detail: this.selectedPoliza ? 'Poliza Actualizada Correctamente': 'Poliza Guardada Correctamente'
    };
    
    this.selectedPoliza 
    ? this.polizaService.updatePoliza(this.selectedPoliza.id,poliza).subscribe({
      next: data => {
        const index = this.polizas.findIndex(poliza => poliza.id === data.id);
        this.polizas[index] = data;
        this.polizas = [...this.polizas];
        this.messageService.add(succesMessage);
        this.handleClean();
      },
      error: error => {
        const errors = Array.isArray(error) ? error  : [error];
        errors.forEach(error =>  this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error
        }))
       }
    })
    : this.polizaService.savePoliza(poliza).subscribe({
      next: data => {
        this.polizas = [...this.polizas, data];
        this.messageService.add(succesMessage);
        this.handleClean();
      },
      error: error => {
        const errors = Array.isArray(error) ? error  : [error];
        errors.forEach(error =>  this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error
        }))
       }
    });
  }

  handleClean(): void {
    this.selectedPoliza = null;
    this.showForm = false;
  }

}
