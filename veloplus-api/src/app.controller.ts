import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService) {}

  @Get()
  getHome(): string {
    return this.appService.getHome();
  }
  @Get(['/compteurs','/v1/compteurs', '/gti525/v1/compteurs'])
  getCompteurs(@Query('key') key: string, @Query('sortDirection') sortDirection: string) {
    key = key || 'ID';
    sortDirection = sortDirection || 'asc';
    return this.appService.getAllCompteurs(key, sortDirection);
  }

  @Get(['/fontaines','/v1/fontaines', '/gti525/v1/fontaines'])
  getFontaines(@Query('key') key: string, @Query('sortDirection') sortDirection: string) {
    key = key || 'ID';
    sortDirection = sortDirection || 'asc';
    return this.appService.getAllFontaines(key, sortDirection);
  }
  @Get(['/fontaine/:id','/v1/fontaine/:id', '/gti525/v1/fontaine/:id'])
  getFontaine(@Param('id') id: string) {
    return this.appService.getFontaine(id);
  }

  @Get(['/compteur/:id','/compteurs/:id', '/v1/compteur/:id', '/gti525/v1/compteur/:id', '/gti525/v1/compteurs/:id'])
  getCompteur(@Param('id') id: string, @Query('debut') debut: number, @Query('fin') fin: number) {
    return this.appService.getCompteur(id, debut, fin);
  }
  
  @Get(['/counterStats/:annee', '/v1/counterStats/:annee', '/gti525/v1/counterStats/:annee'])
  getCompteurStats(@Param('annee') annee: number) {
    return this.appService.getCounterStats(annee);
  }

}
