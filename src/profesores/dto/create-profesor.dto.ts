import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateProfesorDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
