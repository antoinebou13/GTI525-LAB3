import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compteurs } from './Compteurs.entity';

@Injectable()
export class CompteursService {
  constructor(
    @InjectRepository(Compteurs)
    private readonly compteursRepository: Repository<Compteurs>,
  ) {}

  async findAll(): Promise<Compteurs[]> {
    return this.compteursRepository.find();
  }

  findOne(id: number): Promise<Compteurs> {
    return this.compteursRepository.findOneBy({ ID: id });
  }
}