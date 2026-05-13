import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NationalIdApplication } from './national_id.entity';

@Entity('verification_logs')
export class VerificationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'national_id_application_id' })
  nationalIdApplicationId: string;

  @Column()
  action: string;

  @Column({ name: 'performed_by' })
  performedBy: string;

  @CreateDateColumn({ name: 'performed_at' })
  performedAt: Date;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @ManyToOne(() => NationalIdApplication, (app: NationalIdApplication) => app.verificationLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'national_id_application_id' })
  nationalIdApplication: NationalIdApplication;
}