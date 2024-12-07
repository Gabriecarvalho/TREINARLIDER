// emailRoutes.ts
import { Router } from 'express';
import { requestCoaching } from '../controllers/emailController';

const router = Router();

router.post('/request-coaching', requestCoaching);

export default router;