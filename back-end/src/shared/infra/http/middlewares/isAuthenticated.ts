import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Não existe Token JWT válido.');

  const [, token] = authHeader.split(' ');

  try {
    verify(token, authConfig.jwt.secret);
    return next();
  } catch {
    throw new AppError('Token JWT inválido.');
  }
}
