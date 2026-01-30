import { Router } from 'express';
import * as customerAuthController from '../controllers/customer.auth.controller';

const router = Router();

router.post('/signup', customerAuthController.signup);
router.post('/login', customerAuthController.login);

export default router;
