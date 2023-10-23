import employerRoutes from '@modules/employer/infra/http/routes/employer.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/employers', employerRoutes);

export default routes;
