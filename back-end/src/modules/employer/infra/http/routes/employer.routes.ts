import multer from 'multer';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import EmployerController from '../controllers/EmployerController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import UpdateProfilePictureEmployerController from '../controllers/UpdateProfilePictureEmployerController';

const employerRoutes = Router();
const upload = multer(uploadConfig);
const employerController = new EmployerController();
const updateProfilePictureController = new UpdateProfilePictureEmployerController();

employerRoutes.post('/createEmployer', employerController.createEmployer);
employerRoutes.put('/updateEmployer/:id', isAuthenticated, employerController.updateEmployer);
employerRoutes.get('/getEmployer/:id', isAuthenticated, employerController.getEmployerById);
employerRoutes.delete('/deleteEmployer/:id', isAuthenticated, employerController.deleteEmployer);
employerRoutes.patch(
  '/profilePicture',
  isAuthenticated,
  upload.single('profilePicture'),
  updateProfilePictureController.update,
);

export default employerRoutes;
