import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
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

  if (!authHeader) throw new AppError('Não existe Token JWT válido.');

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Token JWT inválido.');
  }
}
