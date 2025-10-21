import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Injectable()
export class InscripcionesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.prisma.inscripcion.findMany({ skip, take: limit });
  }

  async findOne(id: number) {
    return this.prisma.inscripcion.findUnique({ where: { id } });
  }

  async create(data: CreateInscripcionDto) {
    return this.prisma.inscripcion.create({ data });
  }

  async update(id: number, data: UpdateInscripcionDto) {
    return this.prisma.inscripcion.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.inscripcion.delete({ where: { id } });
  }
}
