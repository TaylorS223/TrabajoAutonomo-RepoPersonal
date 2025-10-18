
import { IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class CreateContratoDto {

  @IsNotEmpty()
  @IsString()
  postulacion_id: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_inicio: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_final: string;
}
