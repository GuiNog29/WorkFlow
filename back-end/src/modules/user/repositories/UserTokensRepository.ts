import { Repository } from 'typeorm';
import { dataSource } from '@infra/database';
import { UserToken } from '../entities/UserToken';
import { IUserTokensRepository } from './interface/IUserTokensRepository';
import { IUserToken } from '../domain/models/IUserToken';

export class UserTokensRepository implements IUserTokensRepository {
  constructor(private userTokenRepository: Repository<UserToken>) {
    this.userTokenRepository = dataSource.getRepository(UserToken);
  }

  async findByToken(token: string): Promise<IUserToken | null> {
    return await this.userTokenRepository.findOneBy({ token });
  }

  async generateToken(userType: number, userId: number): Promise<IUserToken> {
    const userToken = this.userTokenRepository.create({ userId, userType });
    await this.userTokenRepository.save(userToken);
    return userToken;
  }

  async invalidateToken(token: string): Promise<void> {
    const userToken = await this.userTokenRepository.findOne({ where: { token } });
    if (userToken) await this.userTokenRepository.remove(userToken);
  }
}
