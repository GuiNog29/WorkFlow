import multer from 'multer';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import EmployerController from '../controllers/EmployerController';
import isAuthenticated from '@modules/http/middlewares/isAuthenticated';
import SessionEmployerController from '../controllers/SessionEmployerController';
import ForgotPasswordEmployerController from '../controllers/ForgotPasswordEmployerController';
import UpdateProfilePictureEmployerController from '../controllers/UpdateProfilePictureEmployerController';

const employerRoutes = Router();
const upload = multer(uploadConfig);
const employerController = new EmployerController();
const sessionEmployerController = new SessionEmployerController();
const forgotPasswordEmployerController = new ForgotPasswordEmployerController();
const updateProfilePictureController = new UpdateProfilePictureEmployerController();

employerRoutes.post('/create', employerController.createEmployer);
employerRoutes.put('/update/:id', isAuthenticated, employerController.updateEmployer);
employerRoutes.get('/get/:id', isAuthenticated, employerController.getEmployerById);
employerRoutes.delete('/delete/:id', isAuthenticated, employerController.deleteEmployer);
employerRoutes.patch(
  '/profilePicture',
  isAuthenticated,
  upload.single('profilePicture'),
  updateProfilePictureController.update,
);
employerRoutes.post('/createSession', sessionEmployerController.create);
employerRoutes.post('/forgotPassword', forgotPasswordEmployerController.create);

export default employerRoutes;
