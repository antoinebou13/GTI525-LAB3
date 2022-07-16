import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { PointInteret } from '../schemas/pointinteret.schema';

@Injectable()
export class PointInteretService {
  constructor(
    @Inject('POINTINTERET_MODEL')
    private pointInteretModel: Model<PointInteret>,
  ) {}

  async findAll(): Promise<PointInteret[]> {
    return this.pointInteretModel.find().exec();
  }

  async findOne(id: string): Promise<PointInteret> {
    return this.pointInteretModel.findById(id).exec();
  } 

  async create(pointInteret: PointInteret): Promise<PointInteret> {
    return this.pointInteretModel.create(pointInteret);
  }

  async update(id: string, pointInteret: PointInteret): Promise<PointInteret> {
    return this.pointInteretModel.findByIdAndUpdate(id, pointInteret, { new: true }).exec();
  }

  async delete(id: string): Promise<PointInteret> {
    return this.pointInteretModel.findByIdAndRemove(id).exec();
  }
}