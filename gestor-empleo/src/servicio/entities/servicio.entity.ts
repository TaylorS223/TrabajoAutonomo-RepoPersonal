import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Negociacion } from "src/negociacion/entities/negociacion.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity('servicio')
export class Servicio {
    @PrimaryGeneratedColumn('uuid', { name: 'id_servicio' })
    id_servicio: string;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    // Cliente (usuario que solicita el servicio)
    @ManyToOne(() => Usuario, (usuario) => usuario.servicioCliente)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Usuario;

    // Trabajador (usuario que realiza el servicio)
    @ManyToOne(() => Usuario, (usuario) => usuario.servicioTrabajador, { nullable: true })
    @JoinColumn({ name: 'trabajador_id' })
    trabajador?: Usuario;

    @Column({ type: 'varchar', length: 50 })
    estadoServicio: string;

    @OneToMany(() => Negociacion, (negociacion) => negociacion.servicio)
    negociaciones: Negociacion[];
}
