import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { VacanteModule } from './vacante/vacante.module';
import { ServicioModule } from './servicio/servicio.module';
import { PostulacionModule } from './postulacion/postulacion.module';
import { NegociacionModule } from './negociacion/negociacion.module';
import { HojaVidaModule } from './hoja-vida/hoja-vida.module';
import { ContratoModule } from './contrato/contrato.module';
import { CategoriaTrabajoModule } from './categoria_trabajo/categoria_trabajo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'test',
          entities: [Usuario],
          synchronize: true,
        }),   
        UsuarioModule, VacanteModule, ServicioModule, PostulacionModule, NegociacionModule, HojaVidaModule, ContratoModule, CategoriaTrabajoModule],
      controllers: [],
      providers: [],
})
export class AppModule {}
