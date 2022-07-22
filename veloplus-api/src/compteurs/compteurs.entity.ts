import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Compteurs {
  @PrimaryColumn({name:'ID', precision: 15 })
  ID: number;
  @Column({name:'Ancien_ID', nullable: true })
  Ancien_ID: number;
  @Column({name:'Nom'})
  Nom: string;
  @Column({name: 'Statut'})	
  Statut: string;
  @Column({ name: 'Latitude', type: 'decimal', precision: 20, scale: 14 })
  Latitude: number;
  @Column({ name: 'Longitude', type: 'decimal', precision: 20, scale: 14 })
  Longitude: number;
  @Column({ name: 'Annee_implante' })
  Annee_implante: number;
}
