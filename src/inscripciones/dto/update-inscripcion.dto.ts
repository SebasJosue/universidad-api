import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcionDto } from './create-inscripcion.dto';

export class UpdateInscripcioneDto extends PartialType(CreateInscripcionDto) {}
