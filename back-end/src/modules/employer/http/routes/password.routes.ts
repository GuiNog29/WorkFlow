import { Router } from 'express';
import ForgotPasswordEmployerController from '../controllers/ForgotPasswordEmployerController';

const passwordEmployerRouter = Router();
const forgotPasswordEmployerController = new ForgotPasswordEmployerController();

passwordEmployerRouter.post('/forgot', forgotPasswordEmployerController.create);

export default passwordEmployerRouter;
