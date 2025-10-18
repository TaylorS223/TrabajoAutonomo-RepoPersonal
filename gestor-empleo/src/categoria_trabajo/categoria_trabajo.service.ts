import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaTrabajoDto } from './dto/create-categoria_trabajo.dto';
import { UpdateCategoriaTrabajoDto } from './dto/update-categoria_trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaTrabajo } from './entities/categoria_trabajo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaTrabajoService {
  constructor(
    @InjectRepository(CategoriaTrabajo)
    private readonly categoriaTrabajoRepository: Repository<CategoriaTrabajo>,
  ) {}

  async create(createCategoriaTrabajoDto: CreateCategoriaTrabajoDto) {
    const nuevaCategoria = await this.categoriaTrabajoRepository.save(createCategoriaTrabajoDto);
    return nuevaCategoria;
  }

  findAll(): Promise<CategoriaTrabajo[]> {
    return this.categoriaTrabajoRepository.find()
      .then((categorias) => {
        return categorias;
      })
      .catch((error) => {
        throw new Error('Error al obtener las categorías: ' + error.message);
      });
  }

  async findOne(id: number) {
    const categoria = await this.categoriaTrabajoRepository.findOneBy({ id });
    if (!categoria) {
      throw new NotFoundException('No se encontró la categoría');
    }
    return categoria;
  }

  update(id: number, updateCategoriaTrabajoDto: UpdateCategoriaTrabajoDto, callback: (err: any, result?: CategoriaTrabajo) => void) {
    this.categoriaTrabajoRepository.findOneBy({ id })
      .then((categoriaEncontrada) => {
        if (!categoriaEncontrada) {
          return callback(new NotFoundException('Categoría no encontrada'));
        }

        // Mezclar los cambios
        const categoriaActualizada = Object.assign(categoriaEncontrada, updateCategoriaTrabajoDto);

        // Guardar los cambios
        this.categoriaTrabajoRepository.save(categoriaActualizada)
          .then((categoriaGuardada) => callback(null, categoriaGuardada))
          .catch((error) => callback(error));
      })
      .catch((error) => callback(error));
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    return await this.categoriaTrabajoRepository.remove(categoria);
  }
}
