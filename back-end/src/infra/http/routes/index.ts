import { Router } from 'express';
import employerRoutes from '@modules/employer/http/routes/employer.routes';
import candidateRoutes from '@modules/candidate/http/routes/candidate.routes';

const routes = Router();

routes.use('/employer', employerRoutes);
routes.use('/candidate', candidateRoutes);

export default routes;
