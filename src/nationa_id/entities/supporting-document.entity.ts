// src/nationa_id/entities/supporting-document.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NationalIdApplication } from './national_id.entity';

@Entity('supporting_documents')
export class SupportingDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'document_type' })
  documentType: string;

  @Column({ name: 'document_name' })
  documentName: string;

  @Column({ name: 'document_url' })
  documentUrl: string;

  @Column({ nullable: true })
  score: number;

  @CreateDateColumn({ name: 'uploaded_at' })
  uploadedAt: Date;

  @Column({ name: 'national_id_application_id', nullable: true })
  nationalIdApplicationId: string;

  @ManyToOne(() => NationalIdApplication, (app: NationalIdApplication) => app.supportingDocuments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'national_id_application_id' })
  nationalIdApplication: NationalIdApplication;
}