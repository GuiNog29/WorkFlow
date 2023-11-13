import { Router } from 'express';
import employerRoutes from '@modules/employer/infra/http/routes/employer.routes';
import candidateRoutes from '@modules/candidate/infra/http/routes/candidate.routes';
import sessionsEmployerRouter from '@modules/employer/infra/http/routes/sessionEmployer.routes';
import sessionsCandidateRouter from '@modules/candidate/infra/http/routes/sessionCandidate.routes';

const routes = Router();

routes.use('/employers', employerRoutes);
routes.use('/candidates', candidateRoutes);
routes.use('/employer-sessions', sessionsEmployerRouter);
routes.use('/candidate-sessions', sessionsCandidateRouter);

export default routes;
