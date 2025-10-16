import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateCursoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsInt()
  carreraId: number;
}
