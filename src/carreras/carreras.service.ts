import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Injectable()
export class CarrerasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.carrera.findMany();
  }

  async findOne(id: number) {
    const carrera = await this.prisma.carrera.findUnique({ where: { id } });
    if (!carrera) throw new NotFoundException(`Carrera con id ${id} no encontrada`);
    return carrera;
  }

  async create(data: CreateCarreraDto) {
    return this.prisma.carrera.create({ data });
  }

  async update(id: number, data: UpdateCarreraDto) {
    await this.findOne(id);
    return this.prisma.carrera.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.carrera.delete({ where: { id } });
  }
}
