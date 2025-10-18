import { Module } from '@nestjs/common';
import { PostulacionService } from './postulacion.service';
import { PostulacionController } from './postulacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postulacion } from './entities/postulacion.entity';
import { VacanteModule } from 'src/vacante/vacante.module';
import { Contrato } from 'src/contrato/entities/contrato.entity';
import { ContratoModule } from 'src/contrato/contrato.module';

@Module({
  imports: [TypeOrmModule.forFeature([Postulacion]),
  VacanteModule,
  ContratoModule,
  ],
  controllers: [PostulacionController],
  providers: [PostulacionService],
  exports: [TypeOrmModule],
})
export class PostulacionModule {}
