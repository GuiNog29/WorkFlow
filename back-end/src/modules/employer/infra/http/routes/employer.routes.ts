import { Router } from 'express';
import EmployerController from '../controllers/EmployerController';

const employerRoutes = Router();
const employerController = new EmployerController();

employerRoutes.post('/createEmployer', employerController.createEmployer);

export default employerRoutes;
