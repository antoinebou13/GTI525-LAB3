import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { Compteurs } from './compteurs.entity';
import { CompteursService } from './compteurs.service';

@Controller('compteurs')
export class CompteursController {
  constructor(private readonly compteursService: CompteursService) {}

  @Get()
  findAll(): Promise<Compteurs[]> {
    return this.compteursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Compteurs> {
    return this.compteursService.findOne(id);
  }
}
