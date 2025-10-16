import { IsInt, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateInscripcionDto {
  @IsNotEmpty()
  @IsInt()
  estudianteId: number;

  @IsNotEmpty()
  @IsInt()
  materiaId: number;

  @IsOptional()
  @IsNumber()
  nota?: number;
}
