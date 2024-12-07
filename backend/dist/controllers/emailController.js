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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCoaching = void 0;
const emailService_1 = require("../services/emailService");
const database_1 = require("../config/database");
const requestCoaching = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { coachId, userEmail } = req.body;
    try {
        const [rows] = yield database_1.db.query('SELECT email FROM Coach WHERE id = ?', [coachId]);
        const coachEmail = (_a = rows[0]) === null || _a === void 0 ? void 0 : _a.email;
        if (!coachEmail) {
            return res.status(404).json({ message: 'Coach não encontrado' });
        }
        const subject = 'Pedido de Coaching Individual';
        const text = `O usuário com o email ${userEmail} solicitou um coaching individual.`;
        const text2 = 'Envamos seu email para o coach, ele irá retornar com um email para você com os horários disponíveis dele.';
        const subject2 = 'Pedido de Coaching Individual';
        yield (0, emailService_1.sendEmail)(coachEmail, subject, text);
        yield (0, emailService_1.sendEmail)(userEmail, subject2, text2);
        res.status(200).json({ message: 'Email enviado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao processar a solicitação de coaching:', error);
        res.status(500).json({ message: 'Erro ao enviar email', error });
    }
});
exports.requestCoaching = requestCoaching;
