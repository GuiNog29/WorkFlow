import { Router } from 'express';
import CandidateController from '../controllers/CandidateController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const candidateRoutes = Router();
const candidateController = new CandidateController();

candidateRoutes.post('/createCandidate', candidateController.createCandidate);
candidateRoutes.put('/updateCandidate/:id', isAuthenticated, candidateController.updateCandidate);
candidateRoutes.get('/getcandidate/:id', isAuthenticated, candidateController.getCandidateById);
candidateRoutes.delete('/deleteCandidate/:id', isAuthenticated, candidateController.deleteCandidate);

export default candidateRoutes;
