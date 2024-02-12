import { Empleado } from "./empleado.interface";
import { Inventario } from "./invetario.inteface";

export interface Poliza {
    id: number;
    cantidad: number;
    fecha: string;
    empleado: Empleado;
    articulo: Inventario;
};