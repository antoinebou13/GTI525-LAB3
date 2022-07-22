import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompteursService } from './db/services/compteurs.service';
import { PointInteretService } from './db/services/pointinterets.service';
import { CounterStatsService  } from './db/services/counterstats.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'toor',
      database: 'veloplus',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CompteursService, PointInteretService, CounterStatsService],
})
export class AppModule {}
