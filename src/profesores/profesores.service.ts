import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Injectable()
export class ProfesoresService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.profesor.findMany({ skip, take: limit, include: { materias: true, titulos: true } }),
      this.prisma.profesor.count(),
    ]);
    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const p = await this.prisma.profesor.findUnique({ where: { id }, include: { materias: true, titulos: true } });
    if (!p) throw new NotFoundException(`Profesor ${id} no encontrado`);
    return p;
  }

  async create(dto: CreateProfesorDto) {
    return this.prisma.profesor.create({ data: { nombre: dto.nombre, email: dto.email } });
  }
}
