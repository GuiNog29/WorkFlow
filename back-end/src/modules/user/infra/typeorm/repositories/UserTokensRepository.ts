import { Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';
import { dataSource } from '@shared/infra/typeorm';
import { IUserTokensRepository } from './interface/IUserTokensRepository';

export class UserTokensRepository implements IUserTokensRepository {
  private userTokenRepository: Repository<UserToken>;

  constructor() {
    this.userTokenRepository = dataSource.getRepository(UserToken);
  }

  async findToken(token: string): Promise<UserToken | null> {
    return await this.userTokenRepository.findOneBy({ token });
  }

  async generateToken(userId: number): Promise<UserToken | null> {
    const userToken = this.userTokenRepository.create({ userId });
    await this.userTokenRepository.save(userToken);
    return userToken;
  }
}
