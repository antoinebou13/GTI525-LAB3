import { Document } from 'mongoose';

export interface CounterStat extends Document {
    readonly _id: string;
    readonly date: Date;
    readonly counterId: string;
    readonly annee: number;
    readonly mois: number;
    readonly jour: number;
    readonly heure: number;
    readonly counterValue: number;
}