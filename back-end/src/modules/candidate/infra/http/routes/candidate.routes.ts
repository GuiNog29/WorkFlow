import multer from 'multer';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import CandidateController from '../controllers/CandidateController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import UpdateProfilePictureCandidateController from '../controllers/UpdateProfilePictureCandidateController';

const candidateRoutes = Router();
const upload = multer(uploadConfig);
const candidateController = new CandidateController();
const updateProfilePictureController = new UpdateProfilePictureCandidateController();

candidateRoutes.post('/createCandidate', candidateController.createCandidate);
candidateRoutes.put('/updateCandidate/:id', isAuthenticated, candidateController.updateCandidate);
candidateRoutes.get('/getcandidate/:id', isAuthenticated, candidateController.getCandidateById);
candidateRoutes.delete(
  '/deleteCandidate/:id',
  isAuthenticated,
  candidateController.deleteCandidate,
);
candidateRoutes.patch(
  '/profilePicture',
  isAuthenticated,
  upload.single('profilePicture'),
  updateProfilePictureController.update,
);

export default candidateRoutes;
