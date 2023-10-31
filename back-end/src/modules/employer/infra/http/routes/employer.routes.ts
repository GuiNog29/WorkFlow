import { Router } from 'express';
import EmployerController from '../controllers/EmployerController';

const employerRoutes = Router();
const employerController = new EmployerController();

employerRoutes.post('/createEmployer', employerController.createEmployer);
employerRoutes.put('/updateEmployer/:id', employerController.updateEmployer);
employerRoutes.get('/getEmployer/:id', employerController.getEmployerById);
employerRoutes.delete('/deleteEmployer/:id', employerController.deleteEmployer);

export default employerRoutes;
