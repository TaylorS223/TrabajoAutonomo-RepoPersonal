import { Module } from '@nestjs/common';
import { VacanteService } from './vacante.service';
import { VacanteController } from './vacante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacante } from './entities/vacante.entity';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vacante]),
  UsuarioModule
],
  
  controllers: [VacanteController],
  providers: [VacanteService],
  exports:[TypeOrmModule]
})
export class VacanteModule {}
