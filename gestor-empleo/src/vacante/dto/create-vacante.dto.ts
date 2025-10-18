import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVacanteDto {
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  profesional: string;

  @IsNotEmpty()
  @IsString()
  usuario_id: string;
}