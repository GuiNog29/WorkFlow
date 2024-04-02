import 'express-async-errors';
import cors from 'cors';
import '@common/container';
import routes from '@infra/http/routes';
import uploadConfig from '@config/upload';
import { AppError } from '@common/exceptions/AppError';
import rateLimiter from '@infra/http/middlewares/rateLimiter';
import express, { NextFunction, Request, Response } from 'express';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
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
