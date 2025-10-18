import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacante } from './entities/vacante.entity';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class VacanteService {
  constructor(
    @InjectRepository(Vacante)
    private readonly vacanteRepository: Repository<Vacante>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(dto: CreateVacanteDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: dto.usuario_id },
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const nuevaVacante = this.vacanteRepository.create({
      descripcion: dto.descripcion,
      profesional: dto.profesional,
      usuario,
    });

    return await this.vacanteRepository.save(nuevaVacante);
  }

  async findAll(): Promise<Vacante[]> {
    return this.vacanteRepository
      .find({ relations: ['usuario', 'postulaciones'] })
      .then((vacantes) => vacantes)
      .catch((err) => {
        throw new Error('Error al obtener vacantes: ' + err.message);
      });
  }

  async findOne(id: string) {
    const vacante = await this.vacanteRepository.findOne({
      where: { id_vacante: id },
      relations: ['usuario', 'postulaciones'],
    });
    if (!vacante) throw new NotFoundException('Vacante no encontrada');
    return vacante;
  }

  async update(
    id: string,
    dto: UpdateVacanteDto,
    callback: (err: any, result?: Vacante) => void,
  ) {
    try {
      const vacanteEncontrada = await this.vacanteRepository.findOne({
        where: { id_vacante: id },
        relations: ['usuario', 'postulaciones'],
      });

      if (!vacanteEncontrada) {
        return callback(new NotFoundException('Vacante no encontrada'));
      }

      // mezclar cambios
      const vacanteActualizada = Object.assign(vacanteEncontrada, dto);

      if ((dto as any).usuario_id) {
        const usuario = await this.usuarioRepository.findOne({
          where: { id_usuario: (dto as any).usuario_id },
        });

        if (!usuario) {
          return callback(new NotFoundException('Usuario no encontrado'));
        }

        vacanteActualizada.usuario = usuario;
      }

      // guardar la vacante actualizada
      const saved = await this.vacanteRepository.save(vacanteActualizada);
      callback(null, saved);

    } catch (err) {
      callback(err);
    }
  }

  async remove(id: string) {
    const vacante = await this.findOne(id);
    return await this.vacanteRepository.remove(vacante);
  }
}