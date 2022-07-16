import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Compteur extends Document {
    // ID,Ancien_ID,Nom,Statut,Latitude,Longitude,Annee_implante
    @Prop()
    ID: number;
    @Prop()
    Ancien_ID: number;
    @Prop()
    Nom: string;
    @Prop()
    Statut: string;
    @Prop()
    Latitude: number;
    @Prop()
    Longitude: number;
    @Prop()
    Annee_implante: number;
}

export const CompteurSchema = SchemaFactory.createForClass(Compteur);