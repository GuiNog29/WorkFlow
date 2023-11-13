import { Router } from 'express';
import SessionCandidateController from '../controllers/SessionCandidateController';

const sessionsCandidateRouter = Router();
const sessionCandidateController = new SessionCandidateController();

sessionsCandidateRouter.post('/createSessionCandidate', sessionCandidateController.create);

export default sessionsCandidateRouter;
