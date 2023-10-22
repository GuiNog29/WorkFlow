import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('employers')
export class Employer{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
