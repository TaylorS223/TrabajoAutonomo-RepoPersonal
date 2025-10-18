import { Module } from '@nestjs/common';
import { CategoriaTrabajoService } from './categoria_trabajo.service';
import { CategoriaTrabajoController } from './categoria_trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaTrabajo } from './entities/categoria_trabajo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaTrabajo])],
  controllers: [CategoriaTrabajoController],
  providers: [CategoriaTrabajoService],
  exports: [TypeOrmModule],
})
export class CategoriaTrabajoModule {}
