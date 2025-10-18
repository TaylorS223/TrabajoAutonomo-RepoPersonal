import { Servicio } from "src/servicio/entities/servicio.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";

@Entity('negociacion')
export class Negociacion {

    @PrimaryGeneratedColumn({name: 'idNegociacion'})
    idNegociacion: string;

    @Column({type: 'text'})
    diaTrabajo: string;

    @Column({type: 'text'})
    horario: string;

    @Column({type: 'text'})
    monto: string;

    @Column({type: 'text'})
    ubicacion: string;

    @ManyToOne(() => Servicio, (servicio) => servicio.negociaciones)
    servicio: Servicio;
}
