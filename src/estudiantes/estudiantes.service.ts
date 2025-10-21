import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.prisma.estudiante.findMany({ skip, take: limit });
  }

  async findOne(id: number) {
    return this.prisma.estudiante.findUnique({ where: { id } });
  }

  async create(data: CreateEstudianteDto) {
    return this.prisma.estudiante.create({ data });
  }

  async update(id: number, data: UpdateEstudianteDto) {
    return this.prisma.estudiante.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.estudiante.delete({ where: { id } });
  }
}
