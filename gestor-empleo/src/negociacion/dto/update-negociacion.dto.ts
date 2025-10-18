import { PartialType } from '@nestjs/mapped-types';
import { CreateNegociacionDto } from './create-negociacion.dto';

export class UpdateNegociacionDto extends PartialType(CreateNegociacionDto) {}
