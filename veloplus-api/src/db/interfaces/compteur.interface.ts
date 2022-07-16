import { Document } from 'mongoose';

export interface Compteur extends Document {
  readonly _id: string;
  readonly ancienId: string;
  readonly nom: string;
  readonly statut: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly anneeImplante: number;
  readonly dateCreation: Date;
  readonly dateModification: Date;
}