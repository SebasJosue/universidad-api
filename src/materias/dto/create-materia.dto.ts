import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateMateriaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsOptional()
  @IsInt()
  profesorId?: number;

  @IsOptional()
  @IsInt()
  cursoId?: number;

  @IsOptional()
  @IsInt()
  carreraId?: number;
}
