import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { Contrato } from './entities/contrato.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContratoService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>,
  ) {}

  async create(createContratoDto: CreateContratoDto) {
    const nuevoContrato = await this.contratoRepo.save(createContratoDto);
    return nuevoContrato;
  }

  findAll(): Promise<Contrato[]> {
    return this.contratoRepo.find()
      .then((contratos) => contratos)
      .catch((error) => {
        throw new Error('Error al obtener los contratos: ' + error.message);
      });
  }

  async findOne(id_contrato: string) {
    const contrato = await this.contratoRepo.findOneBy({ id_contrato });
    if (!contrato) {
      throw new NotFoundException('No se encontró el contrato');
    }
    return contrato;
  }

  
  update(
    id_contrato: string,
    updateContratoDto: UpdateContratoDto,
    callback: (err: any, result?: Contrato) => void,
  ) {
    this.contratoRepo.findOneBy({ id_contrato })
      .then((contratoEncontrado) => {
        if (!contratoEncontrado) {
          return callback(new NotFoundException('Contrato no encontrado'));
        }

        // Mezclar los cambios
        const contratoActualizado = Object.assign(contratoEncontrado, updateContratoDto);

        // Guardar cambios
        this.contratoRepo.save(contratoActualizado)
          .then((contratoGuardado) => callback(null, contratoGuardado))
          .catch((error) => callback(error));
      })
      .catch((error) => callback(error));
  }

  async remove(id_contrato: string) {
    const contrato = await this.findOne(id_contrato);
    return await this.contratoRepo.remove(contrato);
  }
}
