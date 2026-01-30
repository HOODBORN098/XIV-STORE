import { Router } from 'express';
import * as paymentController from '../controllers/payment.controller';

const router = Router();

router.post('/create-intent', paymentController.createPaymentIntent);

export default router;
