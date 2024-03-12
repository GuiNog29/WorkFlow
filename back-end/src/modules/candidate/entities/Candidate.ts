import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ICandidate } from '../domain/models/ICandidate';

@Entity('candidates')
export class Candidate implements ICandidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  profile_picture: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'profile_picture_url' })
  getProfilePictureUrl(): string | null {
    if (!this.profile_picture) return null;

    return `${process.env.APP_API_URL}/files/${this.profile_picture}`;
  }
}
