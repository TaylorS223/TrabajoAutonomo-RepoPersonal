import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vacante } from "src/vacante/entities/vacante.entity";
import { HojaVida } from "src/hoja-vida/entities/hoja-vida.entity";
import { Servicio } from "src/servicio/entities/servicio.entity";



@Entity('usuario')
export class Usuario {
    
    @PrimaryGeneratedColumn("uuid")
    id_usuario: string

    @Column()
    nombre: string

    @Column()
    edad: number

    @Column()
    correo: string
    
    @Column()
    password: string

    @Column()
    rol: string

    @OneToMany(() => Vacante, (vacante) => vacante.usuario)
    vacantes: Vacante[];

    @OneToMany(() => HojaVida, (hojaVida) => hojaVida.usuario_id)
    hojasVida: HojaVida[]

    @OneToMany(() => Servicio, (servicio) => servicio.cliente)
    servicioCliente: Servicio[]

    @OneToMany(() => Servicio, (servicio) => servicio.trabajador)
    servicioTrabajador: Servicio[]
}




