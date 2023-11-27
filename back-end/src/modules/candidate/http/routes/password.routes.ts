import { Router } from 'express';
import ForgotPasswordCandidateController from '../controllers/ForgotPasswordCandidateController';

const passwordCandidateRouter = Router();
const forgotPasswordCandidateController = new ForgotPasswordCandidateController();

passwordCandidateRouter.post('/forgot', forgotPasswordCandidateController.create);

export default passwordCandidateRouter;
