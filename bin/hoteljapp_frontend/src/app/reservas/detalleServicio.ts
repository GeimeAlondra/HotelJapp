import { Servicio } from "../servicios/servicio";
import { Reserva } from "./reserva";
import { ReservaService } from "./reserva.service";

export class DetalleServicio{
    id?: number;
    servicio?: Servicio;
    reserva?: Reserva;
}