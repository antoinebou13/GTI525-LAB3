import { Injectable, Logger } from '@nestjs/common';
import * as Papa from 'papaparse';
import { readFileSync } from 'fs';
import { Console } from 'console';
import { parse } from 'path';

@Injectable()
export class AppService {
  constructor() {}

  getHome(): string {
    return 'Hello World!';
  }

  getCompteur(id: string, debut: number, fin: number) {
    const csvFilePath = __dirname + '/assets/compteurs/compteurs.csv';
    const parseFile = this.parseCSV(csvFilePath);
    // TODO : filtrer par id
    // const compteurStats = this.pointInteretService.findOne(id).then((pointInteret) => {
    //   const compteurStats = parseFile.data.filter(
    //     (compteurStat) =>
    //       parseInt(compteurStat.ID) == parseInt(id) &&
    //       parseInt(compteurStat.Date) >= debut &&
    //       parseInt(compteurStat.Date) <= fin,
    //   );
    //   return compteurStats;
    // }
    // );

    const compteur = parseFile.data.find(
      (compteur) => parseInt(compteur.ID) == parseInt(id),
    );

    if (debut && fin) {
      let debutYear = debut.toString().substring(0, 4);
      let debutMonth = debut.toString().substring(4, 6);
      let debutDay = debut.toString().substring(6, 8);
      let parseDebut = new Date(debutYear + '-' + debutMonth + '-' + debutDay);

      let finYear = fin.toString().substring(0, 4);
      let finMonth = fin.toString().substring(4, 6);
      let finDay = fin.toString().substring(6, 8);
      let parseFin = new Date(finYear + '-' + finMonth + '-' + finDay);
      parseFin.setDate(parseFin.getDate() + 1);
      parseFin.setHours(23);
      let compteurStats = this.getCounterStats(parseInt(debutYear));

      let compteurStatsFiltered = compteurStats.filter(
        (compteurStat) =>
          new Date(compteurStat.Date) >= parseDebut &&
          new Date(compteurStat.Date) <= parseFin,
      );

      compteur.countTotal = this.generateCountTotal(id, compteurStatsFiltered);
      compteur.countByDay = this.generateCountByDay(
        id,
        compteurStatsFiltered,
        parseDebut,
        parseFin,
      );
      compteur.countByMonth = this.generateCountbyMonth(
        id,
        compteurStatsFiltered,
        parseDebut,
        parseFin,
      );
      compteur.countByYear = this.generateCountByYear(
        id,
        compteurStatsFiltered,
        parseDebut,
        parseFin,
      );
    }
    return compteur;
  }

  generateCountTotal(id: string, compteurStatsFiltered: any[]): number {
    // TODO merge with the changes of kamil
    let sumCounterStat = compteurStatsFiltered.reduce(
      (acc, curr) => acc + curr[id],
      0,
    );
    console.log('sum : ' + sumCounterStat);
    return sumCounterStat || 0;
  }

  generateCountByDay(
    id: string,
    compteurStatsFiltered: any[],
    debut: Date,
    fin: Date,
  ): any[] {
    let countByDay = [];
    let currentDate = debut;
    fin.setHours(23);
    fin.setMinutes(59);
    fin.setDate(fin.getDate() - 1);
    currentDate.setHours(23);
    console.log('fin : ' + fin);
    while (currentDate < fin) {
      currentDate.setDate(currentDate.getDate() + 1);

      console.log('curr: ' + currentDate);
      let compteurStatDay = compteurStatsFiltered.filter(
        (compteurStat) =>
          new Date(compteurStat.Date).getDate() === currentDate.getDate() &&
          new Date(compteurStat.Date).getMonth() === currentDate.getMonth() &&
          new Date(compteurStat.Date).getFullYear() ===
            currentDate.getFullYear(),
      );
      compteurStatDay.forEach((compteurStat) => {
        let compteurStatDate = new Date(compteurStat.Date);
        console.log(compteurStatDate);
        //console.log('curr: ' + currentDate);
      });
      let compteurStat = 0;
      compteurStat = this.generateCountTotal(id, compteurStatDay);
      console.log('compte : ' + compteurStat);
      currentDate.setDate(currentDate.getDate() - 1);
      countByDay.push({
        date: new Date(currentDate),
        count: compteurStat,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return countByDay;
  }

  generateCountbyMonth(
    id: string,
    compteurStatsFiltered: any[],
    debut: Date,
    fin: Date,
  ): any[] {
    let countByMonth = [];
    let currentDate = debut;
    while (currentDate < fin) {
      let compteurStatMonth = compteurStatsFiltered.filter(
        (compteurStat) =>
          new Date(compteurStat.Date).getMonth() == currentDate.getMonth(),
      );
      let compteurStat = 0;
      if (compteurStatMonth.length > 0) {
        compteurStat = this.generateCountTotal(id, compteurStatMonth);
      }
      countByMonth.push({
        date: new Date(currentDate),
        count: compteurStat,
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return countByMonth;
  }

  generateCountByYear(
    id: string,
    compteurStatsFiltered: any[],
    debut: Date,
    fin: Date,
  ): any[] {
    let countByYear = [];
    let currentDate = debut;
    while (currentDate < fin) {
      let compteurStatYear = compteurStatsFiltered.filter(
        (compteurStat) =>
          new Date(compteurStat.Date).getFullYear() ==
          currentDate.getFullYear(),
      );
      let compteurStat = 0;
      if (compteurStatYear.length > 0) {
        compteurStat = this.generateCountTotal(id, compteurStatYear);
      }
      countByYear.push({
        date: new Date(currentDate),
        count: compteurStat,
      });
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    return countByYear;
  }

  getAllCompteurs(key: string, sortDirection: string) {
    // TODO change to db
    const csvFilePath = __dirname + '/assets/compteurs/compteurs.csv';
    const parseFile = this.parseCSV(csvFilePath);
    this.sortCompteurs(parseFile.data, key, sortDirection);
    return parseFile.data;
  }

  getAllFontaines(key: string, sortDirection: string) {
    // TODO change to db
    const csvFilePath = __dirname + '/assets/fontaines/fontaines.csv';
    const parseFile = this.parseCSV(csvFilePath);
    this.sortCompteurs(parseFile.data, key, sortDirection);
    return parseFile.data;
  }

  getAllCounterStats(annee: number) {
    // TODO change to db
    const csvFilePath = __dirname + '/assets/fontaines/fontaines.csv';
    const parseFile = this.parseCSV(csvFilePath);
    return parseFile.data;
  }

  getCounterStats(annee: number) {
    const filePathBase = __dirname + '/assets/counterStats/';
    if (annee < 2018) {
      throw new Error('Annee inferieur a 2018');
    }
    if (annee > 2021) {
      throw new Error('Annee superieur a 2021');
    }

    const csvFilePath = filePathBase + 'counter_stats_' + annee + '.csv';
    const parseFile = this.parseCSV(csvFilePath);
    return parseFile.data;
  }

  getFontaine(id: string) {
    const csvFilePath = __dirname + '/assets/fontaines/fontaines.csv';
    const parseFile = this.parseCSV(csvFilePath);
    const fontaine = parseFile.data.find(
      (fontaine) => parseInt(fontaine.ID) == parseInt(id),
    );
    return fontaine;
  }

  // TODO
  // createPointInteret(pointInteret: createPointInteretDto) {
    // return this.pointInteretService.createPointInteret(pointInteret);
  // }

  sortCompteurs(data: any[], key: string, sortDirection: string) {
    let sortTypeCompteurs = {
      ID: 'number',
      Ancien_ID: 'number',
      Nom: 'string',
      Statut: 'string',
      Annee_implante: 'number',
    };

    data.sort((a, b) => {
      return this.compare(
        a[key],
        b[key],
        sortTypeCompteurs[key],
        sortDirection,
      );
    });
  }

  sortFontaines(data: any[], key: string, sortDirection: string) {
    let sortTypeFontaines = {
      ID: 'number',
      Arrondissement: 'string',
      Type: 'string',
      Nom_parc_lieu: 'string',
      Adresse: 'string',
    };
    data.sort((a, b) => {
      return this.compare(
        a[key],
        b[key],
        sortTypeFontaines[key],
        sortDirection,
      );
    });
  }

  private compare(a, b, type, sortDirection) {
    if (type === 'number') {
      if (sortDirection === 'asc') {
        return a - b;
      } else if (sortDirection === 'desc') {
        return b - a;
      }
    }
    if (type === 'string') {
      if (sortDirection === 'asc') {
        return a.localeCompare(b);
      } else if (sortDirection === 'desc') {
        return b.localeCompare(a);
      }
    }
  }

  private parseCSV(csvFilePath) {
    let start = null;
    let end = null;
    let firstError = null;
    let errorCount = 0;
    let rowCount = 0;

    const csvData = readFileSync(csvFilePath, { encoding: 'utf8' });
    const csvParseOptions = {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      worker: false,
      transformHeader: (h) => {
        if (csvFilePath.includes('counter_stats_2018.csv')) {
          let newHeaderMap = {
            Berri1: '100003032',
            Boyer: '100012218',
            'Boyer 2': '100035408',
            Brébeuf: '100004575',
            'Christophe-Colomb': '100035409',
            'CSC (Côte Sainte-Catherine)': '100003041',
            'Eco-Display Parc Stanley': '100041114',
            'Eco-Totem - Métro Laurier': '100007390',
            'Edmond Valade': '100041101',
            'Gouin / Lajeunesse': '100034805',
            '2': '100003039',
            '3': '100011783',
            'Notre-Dame': '100001753',
            Parc: '38',
            PierDup: '100003040',
            'Pont Jacques-Cartier': '100002880',
            'Rachel / Hôtel de Ville': '100012217',
            'Rachel / Papineau': '100003034',
            'René-Lévesque': '100011748',
            'Saint-Antoine': '100011747',
            'Saint-Laurent/Bellechasse': '100025474',
            'Saint-Urbain': '100017523',
            Viger: '100047030',
            Date: 'Date',
          };
          return newHeaderMap[h];
        }
        return h.trim();
      },
      before: (file) => {
        start = performance.now();
        console.log('Parsing file...', file);
      },
      error: (err, file) => {
        console.log('ERROR:', err, file);
        firstError = firstError || err;
        errorCount++;
      },
      complete: (results, file) => {
        end = performance.now();

        if (results && results.errors) {
          if (results.errors) {
            errorCount = results.errors.length;
            firstError = results.errors[0];
          }
          if (results.data && results.data.length > 0)
            rowCount = results.data.length;
        }
        this.printStats(
          'Done parsing file: ' + csvFilePath,
          start,
          end,
          rowCount,
          errorCount,
          firstError,
        );
      },
    };
    var results = Papa.parse(csvData.toString(), csvParseOptions);
    return results;
  }

  private async printStats(msg, start, end, rowCount, errorCount, firstError) {
    if (msg) {
      console.log(msg);
      console.log(
        '       Time:',
        end - start ||
          '(Unknown; your browser does not support the Performance API)',
        'ms',
      );
      console.log('  Row count:', rowCount);
    }
    if (errorCount) {
      console.log('First error:', firstError);
    }
  }
}
