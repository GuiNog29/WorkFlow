import { Router } from 'express';
import employerRoutes from '@modules/employer/infra/http/routes/employer.routes';
import candidateRoutes from '@modules/candidate/infra/http/routes/candidate.routes';
import sessionsEmployerRouter from '@modules/employer/infra/http/routes/sessions.routes';
import passwordEmployerRouter from '@modules/employer/infra/http/routes/password.routes';
import sessionsCandidateRouter from '@modules/candidate/infra/http/routes/sessions.routes';
import passwordCandidateRouter from '@modules/candidate/infra/http/routes/password.routes';

const routes = Router();

routes.use('/employers', employerRoutes);
routes.use('/candidates', candidateRoutes);
routes.use('/employer-sessions', sessionsEmployerRouter);
routes.use('/candidate-sessions', sessionsCandidateRouter);
routes.use('/employer-password', passwordEmployerRouter);
routes.use('/candidate-password', passwordCandidateRouter);

export default routes;
