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
exports.register = register;
exports.login = login;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
const userService_1 = require("../services/userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database"); // Adjust the path as necessary
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password, phone, location } = req.body;
        try {
            const user = yield (0, userService_1.registerUser)(name, email, password, phone, location);
            res.status(201).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const { user, token } = yield (0, userService_1.loginUser)(email, password);
            res.status(200).json({ user, token });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    });
}
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const query = 'SELECT id, name, email, phone, location FROM User WHERE id = ?';
            const [rows] = (yield database_1.db.query(query, [decoded.id]))[0];
            const user = rows[0];
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json(user);
        }
        catch (error) {
            res.status(401).json({ error: 'Token inválido' });
        }
    });
}
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const { name, email, phone, location } = req.body;
            const result = yield (0, userService_1.updateUser)(decoded.id, name, email, phone, location);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar o perfil' });
        }
    });
}
