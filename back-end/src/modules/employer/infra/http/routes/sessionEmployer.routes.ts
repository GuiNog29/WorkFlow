import { Router } from 'express';
import SessionEmployerController from '../controllers/SessionEmployerController';

const sessionsEmployerRouter = Router();
const sessionEmployerController = new SessionEmployerController();

sessionsEmployerRouter.post('/createSessionEmployer', sessionEmployerController.create);

export default sessionsEmployerRouter;
