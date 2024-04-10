import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';
import { AppError } from '@common/exceptions/AppError';
import { NextFunction, Request, Response } from 'express';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Token JWT não fornecido.');

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme)) throw new AppError('Formato de token mal formado.');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as string) as ITokenPayload;

    request.user = {
      id: decodedToken.sub,
    };

    return next();
  } catch {
    throw new AppError('Token JWT inválido.');
  }
}
