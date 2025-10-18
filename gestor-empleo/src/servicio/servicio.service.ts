import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  async create(createServicioDto: CreateServicioDto) {
    const nuevoServicio = await this.servicioRepository.save(createServicioDto);
    return nuevoServicio;
  }

  async findAll(): Promise<Servicio[]> {
    return this.servicioRepository.find()
      .then((servicios) => {
        return servicios;
      })
      .catch((error) => {
        throw new Error('Error al obtener los servicios: ' + error.message);
      });
  }

  async findOne(id: string) {
    const servicio = await this.servicioRepository.findOneBy({ id_servicio: id });
    if (!servicio) {
      throw new NotFoundException('No se encontró el servicio');
    }
    return servicio;
  }

  // UPDATE con callback y Promises
  async update(
    id: string,
    updateServicioDto: UpdateServicioDto,
    callback: (err: any, result?: Servicio) => void,
  ) {
    this.servicioRepository.findOneBy({ id_servicio: id })
      .then((servicioEncontrado) => {
        if (!servicioEncontrado) {
          return callback(new NotFoundException('Servicio no encontrado'));
        }

        // Mezclar los cambios
        const servicioActualizado = Object.assign(servicioEncontrado, updateServicioDto);

        // Guardar cambios
        this.servicioRepository.save(servicioActualizado)
          .then((servicioGuardado) => callback(null, servicioGuardado))
          .catch((error) => callback(error));
      })
      .catch((error) => callback(error));
  }

  async remove(id: string) {
    const servicio = await this.findOne(id);
    return await this.servicioRepository.remove(servicio);
  }
}
