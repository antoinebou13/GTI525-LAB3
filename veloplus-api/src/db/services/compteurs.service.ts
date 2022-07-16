import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Compteur } from '../schemas/compteur.schema';

@Injectable()
export class CompteursService {
  constructor(
    @Inject('COMPTEUR_MODEL')
    private compteurModel: Model<Compteur>,
  ) {}

  async findAll(): Promise<Compteur[]> {
    return this.compteurModel.find().exec();
  }

  async findOne(id: string): Promise<Compteur> {
    return this.compteurModel.findById(id).exec();
  }

  async create(compteur: Compteur): Promise<Compteur> {
    return this.compteurModel.create(compteur);
  }

  async update(id: string, compteur: Compteur): Promise<Compteur> {
    return this.compteurModel.findByIdAndUpdate(id, compteur, { new: true }).exec();
  }
}