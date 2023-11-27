import { Repository } from 'typeorm';
import { dataSource } from '@infra/database';
import { UserToken } from '../entities/UserToken';
import { IUserTokensRepository } from './interface/IUserTokensRepository';

export class UserTokensRepository implements IUserTokensRepository {
  private userTokenRepository: Repository<UserToken>;

  constructor() {
    this.userTokenRepository = dataSource.getRepository(UserToken);
  }

  async findByToken(token: string): Promise<UserToken | null> {
    return await this.userTokenRepository.findOneBy({ token });
  }

  async generateToken(userType: number, userId: number): Promise<UserToken | null> {
    const userToken = this.userTokenRepository.create({ userId, userType });
    await this.userTokenRepository.save(userToken);
    return userToken;
  }
}
