import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTituloDto } from './dto/create-titulo.dto';

@Injectable()
export class TitulosService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.titulo.findMany({ skip, take: limit, include: { profesor: true } }),
      this.prisma.titulo.count(),
    ]);
    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const t = await this.prisma.titulo.findUnique({ where: { id }, include: { profesor: true } });
    if (!t) throw new NotFoundException(`Titulo ${id} no encontrado`);
    return t;
  }

  async create(dto: CreateTituloDto) {
    return this.prisma.titulo.create({ data: { nombre: dto.nombre, profesor: { connect: { id: dto.profesorId } } } });
  }
}
