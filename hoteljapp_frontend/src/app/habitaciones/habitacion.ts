import { TipoHabitacion } from "../tipo-habitaciones/tipo-habitacion";
import {Piso} from "../pisos/piso"

export class Habitacion{
    id?:number;
    nombre?:string;
    precio?:number;
    imagen?:string;
    servicio?:string;
    estado?:string;
    tipoHabitacion?:TipoHabitacion;
    piso?:Piso;
}