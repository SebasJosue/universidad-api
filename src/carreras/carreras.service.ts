import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Injectable()
export class CarrerasService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.carrera.findMany({ skip, take: limit, include: { cursos: true, materias: true } }),
      this.prisma.carrera.count(),
    ]);
    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const c = await this.prisma.carrera.findUnique({ where: { id }, include: { cursos: true, materias: true } });
    if (!c) throw new NotFoundException(`Carrera ${id} no encontrada`);
    return c;
  }

  async create(dto: CreateCarreraDto) {
    return this.prisma.carrera.create({ data: { nombre: dto.nombre } });
  }
}
