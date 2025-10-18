import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Vacante } from 'src/vacante/entities/vacante.entity';
import { Contrato } from 'src/contrato/entities/contrato.entity';

@Entity('postulacion')
export class Postulacion {
  @PrimaryGeneratedColumn('uuid', { name: 'id_postulacion' })
  id_postulacion: string;

  @ManyToOne(() => Vacante, (vacante) => vacante.postulaciones)
  @JoinColumn({ name: 'vacante_id' })
  vacante: Vacante;

  @Column({ type: 'varchar', length: 50 })
  estado_postulacion: string;

  @Column({ type: 'date' })
  fecha_postulacion: Date;

  @ManyToOne(() => Contrato, (contrato) => contrato.postulacion, { nullable: true })
  contrato: Contrato;
}
