import candidateRoutes from '@modules/candidate/infra/http/routes/candidate.routes';
import employerRoutes from '@modules/employer/infra/http/routes/employer.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/employers', employerRoutes);
routes.use('/candidates', candidateRoutes);

export default routes;
