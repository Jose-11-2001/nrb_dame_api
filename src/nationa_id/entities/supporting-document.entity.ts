import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NationalIdApplication } from './national_id.entity';

@Entity('supporting_documents')
export class SupportingDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  documentType: string;

  @Column()
  documentName: string;

  @Column()
  documentUrl: string;

  @Column({ nullable: true })
  score: number;

  @CreateDateColumn()
  uploadedAt: Date;

  @ManyToOne(() => NationalIdApplication, (app: NationalIdApplication) => app.supportingDocuments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nationalIdApplicationId' })
  nationalIdApplication: NationalIdApplication;

  @Column({ nullable: true })
  nationalIdApplicationId: string;
}