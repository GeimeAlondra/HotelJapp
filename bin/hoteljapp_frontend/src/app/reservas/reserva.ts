import { Cliente } from "../clientes/cliente";
import { DetalleServicio } from "./detalleServicio";
import { DetalleReserva } from "./detalleReserva";

export class Reserva {
    id?: number;
    fechaRegistro?: Date;
    fechaIngreso?: Date;
    fechaSalida?: Date;
    dia?: number;
    total?: number;
    estado?: string;
    cliente?: Cliente;
    detalleReserva?: DetalleReserva[];
    detalleServicio?: DetalleServicio[];
}