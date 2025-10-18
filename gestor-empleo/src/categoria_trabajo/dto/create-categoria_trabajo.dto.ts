import { IsNumber, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateCategoriaTrabajoDto {
    @IsString()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @MaxLength(255)
    descripcion: string;

    @IsString()
    @MaxLength(100)
    sector: string;
}
