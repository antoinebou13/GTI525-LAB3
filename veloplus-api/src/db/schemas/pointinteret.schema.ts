import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PointInteret extends Document {
    @Prop()
    ID: number;
    @Prop()
    Arrondissement: string;
    @Prop()
    Nom_parc_lieu: string;
    @Prop()
    Proximité_jeux_repère: string;
    @Prop()
    Intersection: string;
    @Prop()
    Type: string;
    @Prop()
    Etat: string;
    @Prop()
    Date_installation: string;
    @Prop()
    Remarque: string;
    @Prop()
    Precision_localisation: string;
    @Prop()
    X: number;
    @Prop()
    Y: number;
    @Prop()
    Longitude: number;
    @Prop()
    Latitude: number;
}

export const PointInteretSchema = SchemaFactory.createForClass(PointInteret);