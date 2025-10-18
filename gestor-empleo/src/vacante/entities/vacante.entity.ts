import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Postulacion } from '../../postulacion/entities/postulacion.entity';
import { HojaVida } from '../../hoja-vida/entities/hoja-vida.entity';

@Entity('vacante')
export class Vacante {
  @PrimaryGeneratedColumn('uuid', { name: 'id_vacante' })
  id_vacante: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.vacantes)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 100 })
  profesional: string;

  @OneToMany(() => Postulacion, (postulacion) => postulacion.vacante)
  postulaciones: Postulacion[];
  
  @ManyToOne(() => HojaVida, (hoja) => hoja.vacantes, { nullable: true })
  @JoinColumn({ name: 'hoja_vida_id' })
  hojaVida?: HojaVida;
}