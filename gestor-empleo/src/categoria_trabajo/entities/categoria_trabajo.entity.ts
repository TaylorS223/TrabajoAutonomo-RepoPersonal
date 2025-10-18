import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { HojaVida } from "src/hoja-vida/entities/hoja-vida.entity";
import { Vacante } from "src/vacante/entities/vacante.entity";

@Entity('categoria_trabajo')
export class CategoriaTrabajo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    sector: string;

    @OneToMany(() => HojaVida, (hoja) => hoja.categoriaTrabajo)
    hojasVida?: HojaVida[];
}