import { Router } from 'express';
import CandidateController from '../controllers/CandidateController';

const candidateRoutes = Router();
const candidateController = new CandidateController();

candidateRoutes.post('/createCandidate', candidateController.createCandidate);
candidateRoutes.put('/updateCandidate/:id', candidateController.updateCandidate);
candidateRoutes.get('/getcandidate/:id', candidateController.getCandidateById);
candidateRoutes.delete('/deleteCandidate/:id', candidateController.deleteCandidate);

export default candidateRoutes;
