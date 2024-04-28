import { IUserToken } from '@modules/user/domain/models/IUserToken';

export interface IUserTokensRepository {
  findByToken(token: string): Promise<IUserToken | null>;
  generateToken(tipoUsuario: number, userId: number): Promise<IUserToken>;
  invalidateToken(token: string): Promise<void>;
}
