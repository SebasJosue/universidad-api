import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { CarrerasModule } from './carreras/carreras.module';
import { CursosModule } from './cursos/cursos.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { TitulosModule } from './titulos/titulos.module';
import { MateriasModule } from './materias/materias.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';

@Module({
  imports: [EstudiantesModule, CarrerasModule, CursosModule, ProfesoresModule, TitulosModule, MateriasModule, InscripcionesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
