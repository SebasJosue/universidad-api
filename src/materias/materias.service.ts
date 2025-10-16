import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMateriaDto } from './dto/create-materia.dto';

@Injectable()
export class MateriasService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.materia.findMany({
        skip,
        take: limit,
        include: { profesor: true, curso: true, carrera: true, inscripciones: true },
        orderBy: { id: 'asc' },
      }),
      this.prisma.materia.count(),
    ]);
    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const m = await this.prisma.materia.findUnique({ where: { id }, include: { profesor: true, curso: true, carrera: true, inscripciones: true } });
    if (!m) throw new NotFoundException(`Materia ${id} no encontrada`);
    return m;
  }

  async create(dto: CreateMateriaDto) {
    const data: any = { nombre: dto.nombre, codigo: dto.codigo };
    if (dto.profesorId) data.profesor = { connect: { id: dto.profesorId } };
    if (dto.cursoId) data.curso = { connect: { id: dto.cursoId } };
    if (dto.carreraId) data.carrera = { connect: { id: dto.carreraId } };
    return this.prisma.materia.create({ data });
  }
}
