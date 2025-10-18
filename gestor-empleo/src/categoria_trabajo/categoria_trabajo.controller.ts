import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaTrabajoService } from './categoria_trabajo.service';
import { CreateCategoriaTrabajoDto } from './dto/create-categoria_trabajo.dto';
import { UpdateCategoriaTrabajoDto } from './dto/update-categoria_trabajo.dto';

@Controller('categoria-trabajo')
export class CategoriaTrabajoController {
  constructor(private readonly categoriaTrabajoService: CategoriaTrabajoService) {}

  @Post()
  create(@Body() createCategoriaTrabajoDto: CreateCategoriaTrabajoDto) {
    return this.categoriaTrabajoService.create(createCategoriaTrabajoDto);
  }

  @Get()
  findAll() {
    return this.categoriaTrabajoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaTrabajoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaTrabajoDto: UpdateCategoriaTrabajoDto) {
    return this.categoriaTrabajoService.update(+id, updateCategoriaTrabajoDto, (err, result) => {
      if (err) {
        throw err; 
      }
      return result;
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaTrabajoService.remove(+id);
  }
}
