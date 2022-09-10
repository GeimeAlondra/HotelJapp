import { Servicio } from "../servicios/servicio";
import { Reserva } from "./reserva";

export class DetalleServicio{
    id?: number;
    servicio?: Servicio;
    reserva?: Reserva;
}