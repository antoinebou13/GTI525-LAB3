import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('/gti525/v1/')
export class AppController {
  constructor(
    private readonly appService: AppService) {}

  @Get()
  getHome(): string {
    return this.appService.getHome();
  }
  
  @Get(['/compteurs'])
  getCompteurs(@Query('key') key: string, @Query('sortDirection') sortDirection: string) {
    key = key || 'ID';
    sortDirection = sortDirection || 'asc';
    return this.appService.getAllCompteurs(key, sortDirection);
  }

  @Get(['/fontaines'])
  getFontaines(@Query('key') key: string, @Query('sortDirection') sortDirection: string) {
    key = key || 'ID';
    sortDirection = sortDirection || 'asc';
    return this.appService.getAllFontaines(key, sortDirection);
  }
  @Get(['fontaine/:id'])
  getFontaine(@Param('id') id: string) {
    return this.appService.getFontaine(id);
  }

  @Get(['compteurs/:id'])
  getCompteur(@Param('id') id: string, @Query('debut') debut: number, @Query('fin') fin: number) {
    return this.appService.getCompteur(id, debut, fin);
  }
  


}
