import { IsNumber, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateHojaVidaDto {
    @IsString()
    @MaxLength(100)
    experiencia: string;

    @IsString()
    @MaxLength(255)
    descripcion: string;

    @IsString()
    @MaxLength(255)
    habilidades: string;

    @IsString()
    @MaxLength(100)
    categoria_trabajo_id: string;
}
