import { AppError } from '@shared/errors/AppError';

export class ValidEmployerDataService {
  public async execute(name: string, email: string) {
    if(name == "") throw new AppError('Nome da empresa deve ser preenchido.');
    if(email == "") throw new AppError('Email deve ser preenchido.');
  }
}
