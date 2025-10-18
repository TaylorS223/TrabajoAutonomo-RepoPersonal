import { Column, Entity, OneToOne, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { CategoriaTrabajo } from "src/categoria_trabajo/entities/categoria_trabajo.entity";
import { Vacante } from "src/vacante/entities/vacante.entity";

@Entity('hoja_vida')
export class HojaVida {
    @PrimaryGeneratedColumn()
    id_hojaVida: string;

    @Column()
    usuario_id: string;

    @Column()
    experiencia: string;

    @Column()
    descripcion: string;

    @Column()
    habilidades: string;

    @Column()
    categoria_trabajo_id: string;

    @OneToMany(() => Vacante, (vacante) => vacante.hojaVida)
    vacantes?: Vacante[];

    @ManyToOne(() => CategoriaTrabajo, (categoria) => categoria.hojasVida, { nullable: true })
    @JoinColumn({ name: 'categoria_trabajo_id' })
    categoriaTrabajo?: CategoriaTrabajo;

    @OneToMany(() => Usuario, (usuario) => usuario.hojasVida)
    hojasVida: Usuario[]

}
