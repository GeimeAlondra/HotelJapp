import { Habitacion } from "../habitaciones/habitacion";
import { Reserva } from "./reserva";

export class DetalleReserva{
    id?: number;
    habitacion?: Habitacion;
    reserva?: Reserva;
}