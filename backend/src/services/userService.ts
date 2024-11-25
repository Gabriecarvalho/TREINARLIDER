import { db } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function registerUser(name: string, email: string, password: string, phone: string, location: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO User (name, email, password, phone, location) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, hashedPassword, phone, location];
    const [result] = await db.query(query, values);
    return result;
}

export async function loginUser(email: string, password: string) {
    const query = 'SELECT * FROM User WHERE email = ?';
    const [rows, _]: [any, any] = await db.query(query, [email]);
    const user = rows[0];

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Senha incorreta');
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, phone: user.phone, location: user.location }, JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
}