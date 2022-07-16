import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CounterStat } from '../schemas/counterStat.schema';

@Injectable()
export class CounterStatsService {
  constructor(
    @Inject('COUNTER_STAT_MODEL')
    private counterStatModel: Model<CounterStat>,
  ) { }

  async findAll(): Promise<CounterStat[]> {
    return this.counterStatModel.find().exec();
  }

  async findOne(id: string): Promise<CounterStat> {
    return this.counterStatModel.findById(id).exec();
  }

}