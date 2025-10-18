import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postulacion } from './entities/postulacion.entity';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';
import { UpdatePostulacionDto } from './dto/update-postulacion.dto';
import { Vacante } from 'src/vacante/entities/vacante.entity';

@Injectable()
export class PostulacionService {
  constructor(
    @InjectRepository(Postulacion)
    private readonly postulacionRepository: Repository<Postulacion>,
    @InjectRepository(Vacante)
    private readonly vacanteRepository: Repository<Vacante>,
  ) {}

  async create(dto: CreatePostulacionDto) {
    const vacante = await this.vacanteRepository.findOneBy({ id_vacante: dto.vacante_id });
    if (!vacante) throw new NotFoundException('Vacante no encontrada');

    const nueva = this.postulacionRepository.create({
      ...dto,
      vacante,
    });

    return await this.postulacionRepository.save(nueva);
  }

  findAll(): Promise<Postulacion[]> {
    return this.postulacionRepository.find({ relations: ['vacante'] })
      .then((postulaciones) => postulaciones)
      .catch((error) => {
        throw new Error('Error al obtener las postulaciones: ' + error.message);
      });
  }

  async findOne(id: string) {
    const postulacion = await this.postulacionRepository.findOne({
      where: { id_postulacion: id },
      relations: ['vacante'],
    });
    if (!postulacion) throw new NotFoundException('Postulación no encontrada');
    return postulacion;
  }

  update(id: string, dto: UpdatePostulacionDto, callback: (err: any, result?: Postulacion) => void) {
    this.postulacionRepository.findOne({
      where: { id_postulacion: id },
      relations: ['vacante'],
    })
    .then((postulacionEncontrada) => {
      if (!postulacionEncontrada) {
        return callback(new NotFoundException('Postulación no encontrada'));
      }

      const postulacionActualizada = Object.assign(postulacionEncontrada, dto);

      this.postulacionRepository.save(postulacionActualizada)
        .then((guardada) => callback(null, guardada))
        .catch((error) => callback(error));
    })
    .catch((error) => callback(error));
  }

  async remove(id: string) {
    const postulacion = await this.findOne(id);
    return await this.postulacionRepository.remove(postulacion);
  }
}
