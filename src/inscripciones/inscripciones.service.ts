import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';

@Injectable()
export class InscripcionesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.inscripcion.findMany({
        skip,
        take: limit,
        include: { estudiante: true, materia: true },
      }),
      this.prisma.inscripcion.count(),
    ]);
    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const ins = await this.prisma.inscripcion.findUnique({ where: { id }, include: { estudiante: true, materia: true } });
    if (!ins) throw new NotFoundException(`Inscripcion ${id} no encontrada`);
    return ins;
  }

  async create(dto: CreateInscripcionDto) {
    // opcional: validar existencia de estudiante y materia
    const estudiante = await this.prisma.estudiante.findUnique({ where: { id: dto.estudianteId } });
    if (!estudiante) throw new BadRequestException(`Estudiante ${dto.estudianteId} no existe`);
    const materia = await this.prisma.materia.findUnique({ where: { id: dto.materiaId } });
    if (!materia) throw new BadRequestException(`Materia ${dto.materiaId} no existe`);

    return this.prisma.inscripcion.create({
      data: {
        estudiante: { connect: { id: dto.estudianteId } },
        materia: { connect: { id: dto.materiaId } },
        nota: dto.nota,
      },
    });
  }
}
