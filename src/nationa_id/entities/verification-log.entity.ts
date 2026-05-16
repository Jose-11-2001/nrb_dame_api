import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NationalIdApplication } from './nationalIdApplication.entity';

@Entity('verification_logs')
export class VerificationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nationalIdApplicationId: string;

  @Column()
  action: string;

  @Column()
  performedBy: string;

  @CreateDateColumn()
  performedAt: Date;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @ManyToOne(() => NationalIdApplication, (app: NationalIdApplication) => app.verificationLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nationalIdApplicationId' })
  nationalIdApplication: NationalIdApplication;
}