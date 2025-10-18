import { IsEmail, IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsInt()
  @Min(18)
  edad: number;

  @IsNotEmpty()
  @IsString()
  rol: string;
}
