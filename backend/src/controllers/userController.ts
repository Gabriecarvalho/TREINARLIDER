import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/userService';
import jwt from 'jsonwebtoken';
import {db} from '../config/database'; // Adjust the path as necessary

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function register(req: Request, res: Response) {
    const { name, email, password, phone, location } = req.body;
    try {
        const user = await registerUser(name, email, password, phone, location);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const { user, token } = await loginUser(email, password);
        res.status(200).json({ user, token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

export async function getProfile(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        const query = 'SELECT id, name, email, phone, location FROM User WHERE id = ?';
        const [rows]: any = (await db.query(query, [decoded.id]))[0];
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
}