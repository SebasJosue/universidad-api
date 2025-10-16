import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.estudiante.findMany({
        skip,
        take: limit,
        include: { inscripciones: true, carrera: true },
        orderBy: { id: 'asc' },
      }),
      this.prisma.estudiante.count(),
    ]);
    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const e = await this.prisma.estudiante.findUnique({
      where: { id },
      include: { inscripciones: { include: { materia: true } }, carrera: true },
    });
    if (!e) throw new NotFoundException(`Estudiante ${id} no encontrado`);
    return e;
  }

  async create(dto: CreateEstudianteDto) {
    const data: any = {
      nombre: dto.nombre,
      email: dto.email,
      nroIdentificacion: dto.nroIdentificacion,
    };
    if (dto.carreraId) data.carrera = { connect: { id: dto.carreraId } };
    return this.prisma.estudiante.create({ data });
  }
}
