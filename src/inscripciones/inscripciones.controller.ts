import { Controller, Get, Post, Body, Param, Query, NotFoundException, Patch, Delete } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.inscripcionesService.findAll(+page, +limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const inscripcion = await this.inscripcionesService.findOne(+id);
    if (!inscripcion) throw new NotFoundException('Inscripción no encontrada');
    return inscripcion;
  }

  @Post()
  create(@Body() data: CreateInscripcionDto) {
    return this.inscripcionesService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateInscripcionDto) {
    const updated = await this.inscripcionesService.update(+id, data);
    if (!updated) throw new NotFoundException('Inscripción no encontrada');
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.inscripcionesService.remove(+id);
    if (!deleted) throw new NotFoundException('Inscripción no encontrada');
    return { message: 'Inscripción eliminada correctamente' };
  }
}
