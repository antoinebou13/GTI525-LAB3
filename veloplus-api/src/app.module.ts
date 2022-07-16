import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompteursService } from './db/services/compteurs.service';
import { PointInteretService } from './db/services/pointinterets.service';
import { CounterStatsService  } from './db/services/counterstats.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/db')],
  controllers: [AppController],
  providers: [AppService, CompteursService, PointInteretService, CounterStatsService],
})
export class AppModule {}
