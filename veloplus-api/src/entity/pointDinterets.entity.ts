import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class PointDinterets {
    @PrimaryColumn({ precision: 15 })
    ID: number;
    @Column({name : 'Arrondissement', nullable: true })
    Arrondissement: string;
    @Column({name : 'Nom_parc_lieu', nullable: true })
    Nom_parc_lieu: string;
    @Column({name : 'Proximite_jeux_repere', nullable: true })
    Proximité_jeux_repère: string;
    @Column({ name: 'Intersection'})
    Intersection: string;
    @Column({ name: 'Remarque', nullable: true })
    Remarque: string;
    @Column({ name: 'Precision_localisation' })
    Precision_localisation: string;
    @Column({ name: 'X', type: 'decimal', precision: 20, scale: 2 })
    X: number;
    @Column({ name: 'Y', type: 'decimal', precision: 20, scale: 2 })
    Y: number;
    @Column({ name: 'Latitude', type: 'decimal', precision: 20, scale: 14 })
    Latitude: number;
    @Column({ name: 'Longitude', type: 'decimal', precision: 20, scale: 14 })
    Longitude: number;
    @Column()
    Type: string;
}