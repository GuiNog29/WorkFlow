import { Router } from 'express';
import candidateRoutes from '@modules/candidate/http/routes/candidate.routes';
import employerRoutes from '@modules/employer/http/routes/employer.routes';
import passwordCandidateRouter from '@modules/candidate/http/routes/password.routes';
import sessionsCandidateRouter from '@modules/candidate/http/routes/sessions.routes';
import passwordEmployerRouter from '@modules/employer/http/routes/password.routes';
import sessionsEmployerRouter from '@modules/employer/http/routes/sessions.routes';

const routes = Router();

routes.use('/employers', employerRoutes);
routes.use('/candidates', candidateRoutes);
routes.use('/employer-sessions', sessionsEmployerRouter);
routes.use('/candidate-sessions', sessionsCandidateRouter);
routes.use('/employer-password', passwordEmployerRouter);
routes.use('/candidate-password', passwordCandidateRouter);

export default routes;
