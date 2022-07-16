import { Document } from 'mongoose';

export interface PointInteret extends Document {
  readonly _id: string;
  readonly arrondissement: string;
  readonly nomParcLieu: string;
  readonly proximiteJeuxRepere: string;
  readonly intersection: string;
  readonly type: string;
  readonly etat: string;
  readonly dateInstallation: Date;
  readonly remarque: string;
  readonly precisionLocalisation: string;
  readonly x: number;
  readonly y: number;
  readonly longitude: number;
  readonly latitude: number;
  readonly dateCreation: Date;
  readonly dateModification: Date;
}