import { Cliente } from "../clientes/cliente";
import { DetalleReserva } from "./detalleReserva";

export class Reserva {
    id?: number;
    fecha_registro?: Date;
    fecha_ingreso?: Date;
    fecha_salida?: Date;
    dia?: number;
    total?: number;
    estado?: string;
    cliente?: Cliente;
    detalleReserva?: DetalleReserva[];
}