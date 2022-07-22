import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompteursModule } from './compteurs/compteurs.module';
import { pointsDinteretsModule } from './pointsInterets/pointDinterets.module';

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
    CompteursModule,
    pointsDinteretsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
