import * as mongoose from 'mongoose';
import { Mongoose } from 'mongoose';
import { CompteurSchema } from './schemas/compteur.schema';
import { CounterStatSchema } from './schemas/counterStat.schema';
import { FontaineSchema } from './schemas/fontaine.schema';


export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/veloplusapi'),
  },
];

export const compteursProviders = [
  {
    provide: 'COMPTEUR_MODEL',
    useFactory: (connection: mongoose.Connection) => connection.model('Compteur', CompteurSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const counterStatProviders = [
  {
    provide: 'COUNTER_STAT_MODEL',
    useFactory: (connection: mongoose.Connection) => connection.model('counterStat', CounterStatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const fontainesProviders = [
  {
    provide: 'FONTAINE_MODEL',
    useFactory: (connection: mongoose.Connection) => connection.model('Fontaine', FontaineSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

