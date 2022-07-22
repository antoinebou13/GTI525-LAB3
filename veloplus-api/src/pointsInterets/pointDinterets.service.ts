import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointDinterets } from './pointDinterets.entity';
import { PointInteretDto } from './pointInteretDTO';

@Injectable()
export class PointsDinteretsService {
  constructor(
    @InjectRepository(PointDinterets)
    private readonly pointsDinteretsRepository: Repository<PointDinterets>,
  ) {}

  async findAll(): Promise<PointDinterets[]> {
    return this.pointsDinteretsRepository.find();
  }

  findOne(id: number): Promise<PointDinterets> {
    return this.pointsDinteretsRepository.findOneBy({ ID: id });
  }
  create(createPointInteretDto: PointInteretDto): Promise<PointDinterets> {
    const pointInteret = new PointDinterets();
    pointInteret.ID = createPointInteretDto.ID;
    pointInteret.nom_parc_lieu = createPointInteretDto.nom_parc_lieu;
    pointInteret.arrondissement = createPointInteretDto.arrondissement;
    pointInteret.intersection = createPointInteretDto.intersection;
    pointInteret.Type = createPointInteretDto.type;
    pointInteret.remarque = createPointInteretDto.remarque;
    pointInteret.latitude = createPointInteretDto.latitude;
    pointInteret.longitude = createPointInteretDto.longitude;
    //@todo ADD ANNEE

    return this.pointsDinteretsRepository.save(pointInteret);
  }
}
