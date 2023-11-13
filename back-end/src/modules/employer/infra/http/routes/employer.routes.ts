import { Router } from 'express';
import EmployerController from '../controllers/EmployerController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import multer from 'multer';

const employerRoutes = Router();
const employerController = new EmployerController();

employerRoutes.post('/createEmployer', employerController.createEmployer);
employerRoutes.put('/updateEmployer/:id', isAuthenticated, employerController.updateEmployer);
employerRoutes.get('/getEmployer/:id', isAuthenticated, employerController.getEmployerById);
employerRoutes.delete('/deleteEmployer/:id', isAuthenticated, employerController.deleteEmployer);

export default employerRoutes;
