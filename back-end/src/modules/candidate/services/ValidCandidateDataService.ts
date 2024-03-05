import { AppError } from "@common/exceptions/AppError";

export class ValidCandidateDataService {
  public async execute(name: string, email: string) {
    if(name == "") throw new AppError('Nome deve ser preenchido.');
    if(email == "") throw new AppError('Email deve ser preenchido.');
  }
}
