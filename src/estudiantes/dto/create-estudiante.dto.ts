import { IsEmail, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateEstudianteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  nroIdentificacion?: string;

  @IsOptional()
  @IsInt()
  carreraId?: number;
}
