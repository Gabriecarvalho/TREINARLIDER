"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trainingController_1 = require("../controllers/trainingController");
const router = express_1.default.Router();
router.get('/trainings', trainingController_1.getTrainingsController);
router.get('/trainings/:id', trainingController_1.getTrainingByIdController);
exports.default = router;
