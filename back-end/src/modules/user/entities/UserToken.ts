import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IUserToken } from '../domain/models/IUserToken';

@Entity('users_tokens')
export class UserToken implements IUserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  readonly userId: number;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly updated_at: Date;

  @Column()
  userType: number;

  constructor() {
    if (!this.token) {
      this.token = uuidv4();
    }
  }
}
