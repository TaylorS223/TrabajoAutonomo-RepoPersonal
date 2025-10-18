import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNegociacionDto } from './dto/create-negociacion.dto';
import { UpdateNegociacionDto } from './dto/update-negociacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Negociacion } from './entities/negociacion.entity';

@Injectable()
export class NegociacionService {
  constructor(
    @InjectRepository(Negociacion)
    private readonly negociacionRepository: Repository<Negociacion>,
  ) {}

  async create(createNegociacionDto: CreateNegociacionDto) {
    const nuevaNegociacion = await this.negociacionRepository.save(createNegociacionDto);
    return nuevaNegociacion;
  }

  async findAll(): Promise<Negociacion[]> {
    return this.negociacionRepository.find()
      .then((negociaciones) => {
        return negociaciones;
      })
      .catch((error) => {
        throw new Error('Error al obtener las negociaciones: ' + error.message);
      });
  }

  async findOne(id: string) {
    const negociacion = await this.negociacionRepository.findOneBy({ idNegociacion: id });
    if (!negociacion) {
      throw new NotFoundException('No se encontró la negociación');
    }
    return negociacion;
  }

  // UPDATE con callback y Promises
  async update(
    id: string,
    updateNegociacionDto: UpdateNegociacionDto,
    callback: (err: any, result?: Negociacion) => void,
  ) {
    this.negociacionRepository.findOneBy({idNegociacion: id })
      .then((negociacionEncontrada) => {
        if (!negociacionEncontrada) {
          return callback(new NotFoundException('Negociación no encontrada'));
        }

        // Mezclar cambios
        const negociacionActualizada = Object.assign(negociacionEncontrada, updateNegociacionDto);

        // Guardar cambios
        this.negociacionRepository.save(negociacionActualizada)
          .then((negociacionGuardada) => callback(null, negociacionGuardada))
          .catch((error) => callback(error));
      })
      .catch((error) => callback(error));
  }

  async remove(id: string) {
    const negociacion = await this.findOne(id);
    return await this.negociacionRepository.remove(negociacion);
  }
}
