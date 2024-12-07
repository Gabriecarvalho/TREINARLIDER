// emailController.ts
import { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';
import { db } from '../config/database';

export const requestCoaching = async (req: Request, res: Response) => {
  const { coachId, userEmail } = req.body;
  console.log(coachId, userEmail,"nadaaqui");

  try {
    const [rows]: any = await db.query('SELECT email FROM Coach WHERE id = ?', [coachId]);
    const coachEmail = rows[0]?.email;

    if (!coachEmail) {
      return res.status(404).json({ message: 'Coach não encontrado' });
    }

    const subject = 'Pedido de Coaching Individual';
    const text = `O usuário com o email ${userEmail} solicitou um coaching individual.`;
    const text2='Envamos seu email para o coach, ele irá retornar com um email para você com os horários disponíveis dele.';
    const subject2 = 'Pedido de Coaching Individual';

    await sendEmail(coachEmail, subject, text);
    await sendEmail(userEmail, subject2, text2);

    res.status(200).json({ message: 'Email enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao processar a solicitação de coaching:', error);
    res.status(500).json({ message: 'Erro ao enviar email', error });
  }
};