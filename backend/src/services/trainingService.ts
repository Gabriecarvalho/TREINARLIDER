import { db } from '../config/database';
import { RowDataPacket } from 'mysql2';


interface Coach {
    coachName: string;
    email: string;
}

interface Training {
    trainingName: string;
}

interface TrainingResult extends Coach, Training {}

const getTrainings = async (): Promise<TrainingResult[]> => {
  const query = `
      SELECT Coach.id AS coachId, Coach.coachName, Coach.email, Training.trainingName
      FROM Coach
      JOIN Training ON Coach.id = Training.coachId
  `;
  try {
      const [results] = await db.query(query);
      return results as TrainingResult[];
  } catch (err) {
      console.error('Database Error:', err);
      throw err;
  }
};

const getTrainingById = async (id: number): Promise<TrainingResult | null> => {
  const query = `
    SELECT Coach.coachName, Coach.email, Training.trainingName, Training.videoLink, Training.description
    FROM Coach
    JOIN Training ON Coach.id = Training.coachId
    WHERE Training.id = ?
  `;
  try {
    const [results]: [any, any] = await db.query(query, [id]);
    return results[0] as TrainingResult | null;
  } catch (err) {
    console.error('Database Error:', err);
    throw err;
  }
};

export { getTrainings, getTrainingById };
