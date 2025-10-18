import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaTrabajoDto } from './create-categoria_trabajo.dto';

export class UpdateCategoriaTrabajoDto extends PartialType(CreateCategoriaTrabajoDto) {}
