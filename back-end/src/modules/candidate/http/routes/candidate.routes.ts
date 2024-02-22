import multer from 'multer';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import CandidateController from '../controllers/CandidateController';
import isAuthenticated from '@modules/http/middlewares/isAuthenticated';
import SessionCandidateController from '../controllers/SessionCandidateController';
import ProfileCandidateController from '../controllers/ProfileCandidateController';
import SendForgotPasswordCandidateController from '../controllers/SendForgotPasswordCandidateController';
import UpdateProfilePictureCandidateController from '../controllers/UpdateProfilePictureCandidateController';

const candidateRoutes = Router();
const upload = multer(uploadConfig.multer);
const candidateController = new CandidateController();
const sessionCandidateController = new SessionCandidateController();
const profileCandidateController = new ProfileCandidateController();
const sendForgotPasswordCandidateController = new SendForgotPasswordCandidateController();
const updateProfilePictureController = new UpdateProfilePictureCandidateController();

candidateRoutes.post('/create', candidateController.createCandidate);
candidateRoutes.get('/listCandidates', isAuthenticated, candidateController.listCandidates);
candidateRoutes.put('/update/:id', isAuthenticated, candidateController.updateCandidate);
candidateRoutes.get('/get/:id', isAuthenticated, candidateController.getCandidateById);
candidateRoutes.delete(
  '/delete/:id',
  isAuthenticated,
  candidateController.deleteCandidate,
);
candidateRoutes.patch(
  '/profilePicture',
  isAuthenticated,
  upload.single('profilePicture'),
  updateProfilePictureController.update,
);
candidateRoutes.post('/createSession', sessionCandidateController.create);
candidateRoutes.post('/forgotPassword', sendForgotPasswordCandidateController.create);
candidateRoutes.get('/profile', isAuthenticated, profileCandidateController.show);
candidateRoutes.put('/updateProfile', isAuthenticated, profileCandidateController.update);

export default candidateRoutes;
