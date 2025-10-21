import { Controller, Get, Post, Body, Param, Query, NotFoundException, Patch, Delete } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.estudiantesService.findAll(+page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const estudiante = await this.estudiantesService.findOne(+id);
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');
    return estudiante;
  }

  @Post()
  create(@Body() data: CreateEstudianteDto) {
    return this.estudiantesService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateEstudianteDto) {
    const updated = await this.estudiantesService.update(+id, data);
    if (!updated) throw new NotFoundException('Estudiante no encontrado');
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.estudiantesService.remove(+id);
    if (!deleted) throw new NotFoundException('Estudiante no encontrado');
    return { message: 'Estudiante eliminado correctamente' };
  }
}
