import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { AppError } from '@shared/errors/AppError';
import employerRoutes from '@modules/employer/infra/http/routes/employer.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/employers', employerRoutes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Erro interno no servidor.'
  });
});

export default app;
