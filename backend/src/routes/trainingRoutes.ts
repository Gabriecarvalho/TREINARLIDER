import express from 'express';
import { getTrainingsController, getTrainingByIdController } from '../controllers/trainingController';

const router = express.Router();

router.get('/trainings', getTrainingsController);
router.get('/trainings/:id', getTrainingByIdController);

export default router;