import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.prisma.curso.findMany({ skip, take: limit });
  }

  async findOne(id: number) {
    return this.prisma.curso.findUnique({ where: { id } });
  }

  async create(data: CreateCursoDto) {
    return this.prisma.curso.create({ data });
  }

  async update(id: number, data: UpdateCursoDto) {
    return this.prisma.curso.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.curso.delete({ where: { id } });
  }
}
