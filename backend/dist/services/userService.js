"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.updateUser = updateUser;
const database_1 = require("../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
function registerUser(name, email, password, phone, location) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const query = 'INSERT INTO User (name, email, password, phone, location) VALUES (?, ?, ?, ?, ?)';
        const values = [name, email, hashedPassword, phone, location];
        const [result] = yield database_1.db.query(query, values);
        return result;
    });
}
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT * FROM User WHERE email = ?';
        const [rows, _] = yield database_1.db.query(query, [email]);
        const user = rows[0];
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Senha incorreta');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name, phone: user.phone, location: user.location }, JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    });
}
function updateUser(id, name, email, phone, location) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'UPDATE User SET name = ?, email = ?, phone = ?, location = ? WHERE id = ?';
        const values = [name, email, phone, location, id];
        const [result] = yield database_1.db.query(query, values);
        return result;
    });
}
