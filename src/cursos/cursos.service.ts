import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCursoDto } from './dto/create-curso.dto';

@Injectable()
export class CursosService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.curso.findMany({ skip, take: limit, include: { carrera: true, materias: true } }),
      this.prisma.curso.count(),
    ]);
    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const c = await this.prisma.curso.findUnique({ where: { id }, include: { carrera: true, materias: true } });
    if (!c) throw new NotFoundException(`Curso ${id} no encontrado`);
    return c;
  }

  async create(dto: CreateCursoDto) {
    return this.prisma.curso.create({ data: { nombre: dto.nombre, carrera: { connect: { id: dto.carreraId } } } });
  }
}
