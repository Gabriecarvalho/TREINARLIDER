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
exports.getTrainingByIdController = exports.getTrainingsController = void 0;
const trainingService_1 = require("../services/trainingService");
const getTrainingsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainings = yield (0, trainingService_1.getTrainings)();
        res.json(trainings);
    }
    catch (err) {
        console.error('Error fetching trainings:', err);
        res.status(500).json({ error: 'An error occurred while fetching trainings.' });
    }
});
exports.getTrainingsController = getTrainingsController;
const getTrainingByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const training = yield (0, trainingService_1.getTrainingById)(Number(id));
        if (training) {
            res.json(training);
        }
        else {
            res.status(404).json({ error: 'Training not found.' });
        }
    }
    catch (err) {
        console.error('Error fetching training details:', err);
        res.status(500).json({ error: 'An error occurred while fetching training details.' });
    }
});
exports.getTrainingByIdController = getTrainingByIdController;
