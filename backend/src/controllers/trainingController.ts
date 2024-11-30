import { Request, Response } from 'express';
import { getTrainings, getTrainingById } from '../services/trainingService';

const getTrainingsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const trainings = await getTrainings();
        res.json(trainings);
    } catch (err) {
        console.error('Error fetching trainings:', err);
        res.status(500).json({ error: 'An error occurred while fetching trainings.' });
    }
};

const getTrainingByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const training = await getTrainingById(Number(id));
    if (training) {
      res.json(training);
    } else {
      res.status(404).json({ error: 'Training not found.' });
    }
  } catch (err) {
    console.error('Error fetching training details:', err);
    res.status(500).json({ error: 'An error occurred while fetching training details.' });
  }
};

export { getTrainingsController, getTrainingByIdController };
