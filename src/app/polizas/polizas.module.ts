import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolizasTableComponent } from './polizas-table/polizas-table.component';
import { FormsModule } from '@angular/forms';
//primeng
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PolizaComponent } from './poliza/poliza.component';
import { PolizaFormComponent } from './poliza-form/poliza-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Card, CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    PolizasTableComponent,
    PolizaComponent,
    PolizaFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    //primeng
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    CardModule
  ],
  exports: [PolizaComponent]
})
export class PolizasModule { }
