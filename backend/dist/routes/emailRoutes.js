"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// emailRoutes.ts
const express_1 = require("express");
const emailController_1 = require("../controllers/emailController");
const router = (0, express_1.Router)();
router.post('/request-coaching', emailController_1.requestCoaching);
exports.default = router;
