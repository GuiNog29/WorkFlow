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

// Controllers
const employerController = new EmployerController();
const sessionEmployerController = new SessionEmployerController();
const profileEmployerController = new ProfileEmployerController();
const sendForgotPasswordEmployerController = new SendForgotPasswordEmployerController();
const updateProfilePictureController = new UpdateProfilePictureEmployerController();

// Candidate routes
employerRoutes.post('/', employerController.createEmployer);
employerRoutes.get('/:id', isAuthenticated, employerController.getEmployerById);
employerRoutes.put('/:id', isAuthenticated, employerController.updateEmployer);
employerRoutes.delete('/:id', isAuthenticated, employerController.deleteEmployer);
employerRoutes.patch(
  '/:id/profile-picture',
  isAuthenticated,
  upload.single('profilePicture'),
  updateProfilePictureController.update,
);

// Session routes
employerRoutes.post('/createSession', sessionEmployerController.create);

// Profile routes
employerRoutes.get('/profile', isAuthenticated, profileEmployerController.show);
employerRoutes.put('/profile', isAuthenticated, profileEmployerController.update);

// Password routes
employerRoutes.post('/forgotPassword', sendForgotPasswordEmployerController.create);

export default employerRoutes;
