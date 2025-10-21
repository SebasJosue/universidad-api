import { Controller, Get, Post, Body, Param, Query, NotFoundException, Patch, Delete } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.materiasService.findAll(+page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const materia = await this.materiasService.findOne(+id);
    if (!materia) throw new NotFoundException('Materia no encontrada');
    return materia;
  }

  @Post()
  create(@Body() data: CreateMateriaDto) {
    return this.materiasService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateMateriaDto) {
    const updated = await this.materiasService.update(+id, data);
    if (!updated) throw new NotFoundException('Materia no encontrada');
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.materiasService.remove(+id);
    if (!deleted) throw new NotFoundException('Materia no encontrada');
    return { message: 'Materia eliminada correctamente' };
  }
}
