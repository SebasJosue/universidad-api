import { Controller, Get, Param, Query, Post, Body, ParseIntPipe, DefaultValuePipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Controller('profesores')
export class ProfesoresController {
  constructor(private service: ProfesoresService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.service.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() dto: CreateProfesorDto) {
    const created = await this.service.create(dto);
    return { status: 'success', data: created };
  }
}
