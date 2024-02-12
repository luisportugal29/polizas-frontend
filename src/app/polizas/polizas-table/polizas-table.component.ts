import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PolizaService } from '../poliza.service';
import { Poliza } from '../interfaces/poliza.interface';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-polizas-table',
  templateUrl: './polizas-table.component.html',
  styleUrls: ['./polizas-table.component.css'],
  providers: [ConfirmationService]
})
export class PolizasTableComponent implements OnInit {

  @Input() polizas: Poliza[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<Poliza>();

  constructor(
    private service: PolizaService,
    private confirmationService: ConfirmationService
    ) { }

  ngOnInit(): void {
      this.service
      .getPolizas()
      .subscribe({
        next: data => this.polizas = data,
        error: error => console.log(error)
      })
  }

  updatePoliza(poliza: Poliza) {
    this.update.emit(poliza);
  }

  deletePoliza(id: number): void {
    this.confirmationService.confirm({
      message: `Seguro de eliminar poliza #${id} ?`,
      accept: () => this.delete.emit(id)
    });
  }


}
