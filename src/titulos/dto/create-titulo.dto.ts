import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTituloDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsInt()
  profesorId: number;
}
