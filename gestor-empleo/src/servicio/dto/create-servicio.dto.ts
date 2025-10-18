
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateServicioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  trabajadorId: string;

  @IsNotEmpty()
  @IsString()
  estadoServicio: string;
}
