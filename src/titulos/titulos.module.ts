import { Module } from '@nestjs/common';
import { TitulosService } from './titulos.service';
import { TitulosController } from './titulos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TitulosController],
  providers: [TitulosService],
})
export class TitulosModule {}
