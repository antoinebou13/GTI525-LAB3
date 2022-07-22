import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PointDinterets {
  @PrimaryColumn({ name: 'ID', precision: 15 })
  ID: number;
  @Column({ name: 'Arrondissement', nullable: true })
  arrondissement: string;
  @Column({ name: 'Nom_parc_lieu', nullable: true })
  nom_parc_lieu: string;
  @Column({ name: 'Proximite_jeux_repere', nullable: true })
  proximité_jeux_repère: string;
  @Column({ name: 'Intersection' })
  intersection: string;
  @Column({ name: 'Etat', nullable: true })
  etat: string;
  @Column({ name: 'Date_installation', nullable: true })
  date_installation: string;
  @Column({ name: 'Remarque', nullable: true })
  remarque: string;
  @Column({ name: 'Precision_localisation' })
  precision_localisation: string;
  @Column({ name: 'X', type: 'decimal', precision: 20, scale: 2 })
  X: number;
  @Column({ name: 'Y', type: 'decimal', precision: 20, scale: 2 })
  Y: number;
  @Column({ name: 'Latitude', type: 'decimal', precision: 20, scale: 14 })
  latitude: number;
  @Column({ name: 'Longitude', type: 'decimal', precision: 20, scale: 14 })
  longitude: number;
  @Column()
  Type: string;
}
