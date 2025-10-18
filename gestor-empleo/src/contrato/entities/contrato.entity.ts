import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postulacion } from "src/postulacion/entities/postulacion.entity"



@Entity('contrato')
export class Contrato {
    @PrimaryGeneratedColumn("uuid")
    id_contrato: string;

    @Column()
    fecha_inicio: Date;

    @Column()
    fecha_final: Date;

    @OneToMany(() => Postulacion, (postulacion) => postulacion.contrato)
    postulacion: Postulacion[];
}
