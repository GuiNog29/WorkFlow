import { Repository } from 'typeorm';
import { dataSource } from '@infra/database';
import { UserToken } from '../entities/UserToken';
import { IUserTokensRepository } from './interface/IUserTokensRepository';
import { IUserToken } from '../domain/models/IUserToken';

export class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = dataSource.getRepository(UserToken);
  }

  async findByToken(token: string): Promise<IUserToken | null> {
    return this.ormRepository.findOneBy({ token });
  }

  async generateToken(userType: number, userId: number): Promise<IUserToken> {
    const userToken = this.ormRepository.create({ userId, userType });
    await this.ormRepository.save(userToken);
    return userToken;
  }

  async invalidateToken(token: string): Promise<void> {
    await this.ormRepository.delete({ token });
  }
}
