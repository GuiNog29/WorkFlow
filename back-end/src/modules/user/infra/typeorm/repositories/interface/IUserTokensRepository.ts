import { UserToken } from '../../entities/UserToken';

export interface IUserTokensRepository {
  findByToken(token: string): Promise<UserToken | null>;
  generateToken(tipoUsuario: number, userId: number): Promise<UserToken | null>;
}
