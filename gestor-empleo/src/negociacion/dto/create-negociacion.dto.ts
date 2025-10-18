import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateNegociacionDto {
  @IsNotEmpty()
  @IsString()
  diaTrabajo: string;

  @IsNotEmpty()
  @IsString()
  horario: string;

  @IsNotEmpty()
  @IsString()
  monto: string;

  @IsNotEmpty()
  @IsString()
  ubicacion: string;

  @IsNotEmpty()
  @IsString()
  servicioId: string;
}


