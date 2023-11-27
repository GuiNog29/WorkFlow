import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/exceptions/AppError';
import routes from '@modules/http/routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Erro interno no servidor.',
  });
});

export default app;
