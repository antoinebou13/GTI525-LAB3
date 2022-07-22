import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Compteurs {
  @PrimaryColumn({ precision: 15 })
  ID: number;
  @Column({ nullable: true })
  Ancien_ID: number;
  @Column()
  Nom: string;
  @Column()
  Statut: string;
  @Column({ name: 'Latitude', type: 'decimal', precision: 20, scale: 14 })
  Latitude: number;
  @Column({ name: 'Longitude', type: 'decimal', precision: 20, scale: 14 })
  Longitude: number;
  @Column({ name: 'Annee_implante' })
  Annee_implante: number;
}
