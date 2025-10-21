import { Controller, Get, Post, Body, Param, Query, NotFoundException, Patch, Delete } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.cursosService.findAll(+page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const curso = await this.cursosService.findOne(+id);
    if (!curso) throw new NotFoundException('Curso no encontrado');
    return curso;
  }

  @Post()
  create(@Body() data: CreateCursoDto) {
    return this.cursosService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCursoDto) {
    const updated = await this.cursosService.update(+id, data);
    if (!updated) throw new NotFoundException('Curso no encontrado');
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.cursosService.remove(+id);
    if (!deleted) throw new NotFoundException('Curso no encontrado');
    return { message: 'Curso eliminado correctamente' };
  }
}
