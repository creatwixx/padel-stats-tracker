import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  location!: string;

  @Column({ nullable: true })
  partner?: string;

  @Column({ type: 'enum', enum: ['win', 'loss'] })
  result!: 'win' | 'loss';

  @Column({ nullable: true })
  score?: string;

  @CreateDateColumn()
  created_at!: Date;
}
