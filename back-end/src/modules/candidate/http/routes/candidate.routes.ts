import multer from 'multer';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import CandidateController from '../controllers/CandidateController';
import isAuthenticated from '@infra/http/middlewares/isAuthenticated';
import SessionCandidateController from '../controllers/SessionCandidateController';
import ProfileCandidateController from '../controllers/ProfileCandidateController';
import SendForgotPasswordCandidateController from '../controllers/SendForgotPasswordCandidateController';
import UpdateProfilePictureCandidateController from '../controllers/UpdateProfilePictureCandidateController';

const candidateRoutes = Router();
const upload = multer(uploadConfig.multer);

// Controllers
const candidateController = new CandidateController();
const sessionCandidateController = new SessionCandidateController();
const profileCandidateController = new ProfileCandidateController();
const sendForgotPasswordCandidateController = new SendForgotPasswordCandidateController();
const updateProfilePictureController = new UpdateProfilePictureCandidateController();

// Candidate routes
candidateRoutes.post('/', candidateController.createCandidate);
candidateRoutes.get('/', isAuthenticated, candidateController.listCandidates);
candidateRoutes.get('/:id', isAuthenticated, candidateController.getCandidateById);
candidateRoutes.put('/:id', isAuthenticated, candidateController.updateCandidate);
candidateRoutes.delete('/:id', isAuthenticated, candidateController.deleteCandidate);
candidateRoutes.patch(
  '/:id/profile-picture',
  isAuthenticated,
  upload.single('profilePicture'),
  updateProfilePictureController.update,
);

// Session routes
candidateRoutes.post('/createSession', sessionCandidateController.create);

// Profile routes
candidateRoutes.get('/profile', isAuthenticated, profileCandidateController.show);
candidateRoutes.put('/Profile', isAuthenticated, profileCandidateController.update);

// Password routes
candidateRoutes.post('/forgotPassword', sendForgotPasswordCandidateController.create);

export default candidateRoutes;
