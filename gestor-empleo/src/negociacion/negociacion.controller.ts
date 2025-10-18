import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NegociacionService } from './negociacion.service';
import { CreateNegociacionDto } from './dto/create-negociacion.dto';
import { UpdateNegociacionDto } from './dto/update-negociacion.dto';

@Controller('negociacion')
export class NegociacionController {
  constructor(private readonly negociacionService: NegociacionService) {}

  @Post()
  create(@Body() createNegociacionDto: CreateNegociacionDto) {
    return this.negociacionService.create(createNegociacionDto);
  }

  @Get()
  findAll() {
    return this.negociacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.negociacionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNegociacionDto: UpdateNegociacionDto) {
    return new Promise((resolve, reject) => {
      this.negociacionService.update(+id, updateNegociacionDto, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.negociacionService.remove(id);
  }
}
