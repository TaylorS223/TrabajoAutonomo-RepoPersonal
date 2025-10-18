import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreatePostulacionDto {
  @IsNotEmpty()
  @IsString()
  vacante_id: string;

  @IsNotEmpty()
  @IsString()
  estado_postulacion: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_postulacion: Date;
}
