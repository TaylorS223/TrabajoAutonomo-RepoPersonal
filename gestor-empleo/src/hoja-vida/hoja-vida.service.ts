import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHojaVidaDto } from './dto/create-hoja-vida.dto';
import { UpdateHojaVidaDto } from './dto/update-hoja-vida.dto';
import { HojaVida } from './entities/hoja-vida.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HojaVidaService {
  constructor(
    @InjectRepository(HojaVida)
    private readonly hojaVidaRepo: Repository<HojaVida>,
  ) {}

  async create(createHojaVidaDto: CreateHojaVidaDto) {
    const nuevaHoja = await this.hojaVidaRepo.save(createHojaVidaDto);
    return nuevaHoja;
  }

  async findAll(): Promise<HojaVida[]> {
    return this.hojaVidaRepo.find()
      .then((hojas) => hojas)
      .catch((error) => {
        throw new Error('Error al obtener las hojas de vida: ' + error.message);
      });
  }

  async findOne(id_hojaVida: string) {
    const hoja = await this.hojaVidaRepo.findOneBy({ id_hojaVida });
    if (!hoja) {
      throw new NotFoundException('No se encontró la hoja de vida');
    }
    return hoja;
  }

  // UPDATE con callback
  async update(
    id_hojaVida: string,
    updateHojaVidaDto: UpdateHojaVidaDto,
    callback: (err: any, result?: HojaVida) => void,
  ) {
    this.hojaVidaRepo.findOneBy({ id_hojaVida })
      .then((hojaEncontrada) => {
        if (!hojaEncontrada) {
          return callback(new NotFoundException('Hoja de vida no encontrada'));
        }

        // Mezclar los cambios
        const hojaActualizada = Object.assign(hojaEncontrada, updateHojaVidaDto);

        // Guardar cambios
        this.hojaVidaRepo.save(hojaActualizada)
          .then((hojaGuardada) => callback(null, hojaGuardada))
          .catch((error) => callback(error));
      })
      .catch((error) => callback(error));
  }

  async remove(id_hojaVida: string) {
    const hoja = await this.findOne(id_hojaVida);
    return await this.hojaVidaRepo.remove(hoja);
  }
}
