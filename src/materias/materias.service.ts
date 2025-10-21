import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriasService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.prisma.materia.findMany({ skip, take: limit });
  }

  async findOne(id: number) {
    return this.prisma.materia.findUnique({ where: { id } });
  }

  async create(data: CreateMateriaDto) {
    return this.prisma.materia.create({ data });
  }

  async update(id: number, data: UpdateMateriaDto) {
    return this.prisma.materia.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.materia.delete({ where: { id } });
  }
}
