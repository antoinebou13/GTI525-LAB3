import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { PointDinterets } from './pointDinterets.entity';
import { PointsDinteretsService } from './pointDinterets.service';
import { PointInteretDto } from './pointInteretDTO';

@Controller('pointInterets')
export class pointsDinteretsController {
  constructor(private readonly pointsDinteretsService: PointsDinteretsService) {}

  @Get()
  findAll(): Promise<PointDinterets[]> {
    return this.pointsDinteretsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PointDinterets> {
    return this.pointsDinteretsService.findOne(id);
  }

  @Post('/create')
  createOne(@Body()pointInteretDto: PointInteretDto): Promise<PointDinterets> {
    return this.pointsDinteretsService.create(pointInteretDto);
  }
}
