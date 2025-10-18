import { Module } from '@nestjs/common';
import { NegociacionService } from './negociacion.service';
import { NegociacionController } from './negociacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Negociacion } from './entities/negociacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Negociacion])],
  controllers: [NegociacionController],
  providers: [NegociacionService],
  exports: [TypeOrmModule]
})
export class NegociacionModule {}
