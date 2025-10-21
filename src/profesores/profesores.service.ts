import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesoresService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.profesor.findMany();
  }

  async findOne(id: number) {
    const profesor = await this.prisma.profesor.findUnique({ where: { id } });
    if (!profesor) throw new NotFoundException(`Profesor con id ${id} no encontrado`);
    return profesor;
  }

  async create(data: CreateProfesorDto) {
    return this.prisma.profesor.create({ data });
  }

  async update(id: number, data: UpdateProfesorDto) {
    const profesor = await this.findOne(id);
    return this.prisma.profesor.update({ where: { id: profesor.id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.profesor.delete({ where: { id } });
  }
}
