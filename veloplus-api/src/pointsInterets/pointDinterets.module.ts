import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointDinterets } from './pointDinterets.entity';
import { pointsDinteretsController } from './pointDinterets.controller';
import { PointsDinteretsService } from './pointDinterets.service';

@Module({
  imports: [TypeOrmModule.forFeature([PointDinterets])],
  providers: [PointsDinteretsService],
  controllers: [pointsDinteretsController],
})
export class pointsDinteretsModule {}