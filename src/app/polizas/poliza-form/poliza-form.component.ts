import { Component, Input, OnInit } from '@angular/core';
import { Poliza } from '../interfaces/poliza.interface';
import { Empleado } from '../interfaces/empleado.interface';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PolizaData } from '../interfaces/polizaData.inteface';


@Component({
  selector: 'app-poliza-form',
  templateUrl: './poliza-form.component.html',
  styleUrls: ['./poliza-form.component.css']
})
export class PolizaFormComponent implements OnInit {

  @Output() save = new EventEmitter<PolizaData>();
  @Output() showModal = new EventEmitter<boolean>();
  @Input() poliza: Poliza;
  @Input() empleados: Empleado[];

  cantidad: number;
  sku: string;
  empleado: Empleado;
  isUpdate: boolean;


  ngOnInit(): void {
      
      this.cantidad = this.poliza ? this.poliza.cantidad: 0;
      this.sku = this.poliza ? this.poliza.articulo.sku : '';
      this.empleado = this.poliza ? this.poliza.empleado : null;
      this.isUpdate = !!this.poliza;
  }

  onSave(): void {
    this.save.emit({
      cantidad: this.cantidad,
       empleadoId: this.empleado.id,
       ...(!this.isUpdate && {sku: this.sku})
     });
   }

   onCloseModal(event: Event): void {
     event.target === event.currentTarget && this.showModal.emit(false);
   }


}
