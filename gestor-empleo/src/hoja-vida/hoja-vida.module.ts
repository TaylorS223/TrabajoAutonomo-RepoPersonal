import { Module } from '@nestjs/common';
import { HojaVidaService } from './hoja-vida.service';
import { HojaVidaController } from './hoja-vida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HojaVida } from './entities/hoja-vida.entity';

@Module({
  imports:[TypeOrmModule.forFeature([HojaVida])],
  controllers: [HojaVidaController],
  providers: [HojaVidaService],
  exports:[TypeOrmModule]
})
export class HojaVidaModule {}
