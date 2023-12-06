import multer from 'multer';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import CandidateController from '../controllers/CandidateController';
import isAuthenticated from '@modules/http/middlewares/isAuthenticated';
import SessionCandidateController from '../controllers/SessionCandidateController';
import SendForgotPasswordCandidateController from '../controllers/SendForgotPasswordCandidateController';
import UpdateProfilePictureCandidateController from '../controllers/UpdateProfilePictureCandidateController';

const candidateRoutes = Router();
const upload = multer(uploadConfig);
const candidateController = new CandidateController();
const sessionCandidateController = new SessionCandidateController();
const sendForgotPasswordCandidateController = new SendForgotPasswordCandidateController();
const updateProfilePictureController = new UpdateProfilePictureCandidateController();

candidateRoutes.post('/create', candidateController.createCandidate);
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

export default candidateRoutes;