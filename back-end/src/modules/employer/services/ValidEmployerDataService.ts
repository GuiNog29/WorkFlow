import { AppError } from '@common/exceptions/AppError';

export class ValidEmployerDataService {
  public async execute(name: string, email: string) {
    if (name.trim() === '') throw new AppError('Nome da empresa deve ser preenchido.');

    if (email.trim() === '') throw new AppError('Email deve ser preenchido.');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError('Email deve ter um formato válido.');
    }
  }
}
