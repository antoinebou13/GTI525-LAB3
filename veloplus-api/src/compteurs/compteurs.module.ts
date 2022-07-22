import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compteurs } from './compteurs.entity';
import { CompteursController } from './compteurs.controller';
import { CompteursService } from './compteurs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Compteurs])],
  providers: [CompteursService],
  controllers: [CompteursController],
})
export class CompteursModule {}