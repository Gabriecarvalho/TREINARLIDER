"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const trainingRoutes_1 = __importDefault(require("./routes/trainingRoutes"));
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3001;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
}));
app.use('/api/users', userRoutes_1.default);
app.use('/api', trainingRoutes_1.default);
app.use('/api/email', emailRoutes_1.default);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
