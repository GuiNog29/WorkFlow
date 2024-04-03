import multer from 'multer';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import EmployerController from '../controllers/EmployerController';
import isAuthenticated from '@infra/http/middlewares/isAuthenticated';
import SessionEmployerController from '../controllers/SessionEmployerController';
import ProfileEmployerController from '../controllers/ProfileEmployerController';
import SendForgotPasswordEmployerController from '../controllers/SendForgotPasswordEmployerController';
import UpdateProfilePictureEmployerController from '../controllers/UpdateProfilePictureEmployerController';

const employerRoutes = Router();
const upload = multer(uploadConfig.multer);
const employerController = new EmployerController();
const sessionEmployerController = new SessionEmployerController();
const profileEmployerController = new ProfileEmployerController();
const sendForgotPasswordEmployerController = new SendForgotPasswordEmployerController();
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
employerRoutes.post('/forgotPassword', sendForgotPasswordEmployerController.create);
employerRoutes.get('/profile', isAuthenticated, profileEmployerController.show);
employerRoutes.put('/updateProfile', isAuthenticated, profileEmployerController.update);

export default employerRoutes;
