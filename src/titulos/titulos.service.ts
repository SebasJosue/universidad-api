import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';

@Injectable()
export class TitulosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.titulo.findMany();
  }

  async findOne(id: number) {
    const titulo = await this.prisma.titulo.findUnique({ where: { id } });
    if (!titulo) throw new NotFoundException(`Título con id ${id} no encontrado`);
    return titulo;
  }

  async create(data: CreateTituloDto) {
    return this.prisma.titulo.create({ data });
  }

  async update(id: number, data: UpdateTituloDto) {
    await this.findOne(id);
    return this.prisma.titulo.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.titulo.delete({ where: { id } });
  }
}
