import { Router } from 'express';
import * as mpesaController from '../controllers/mpesa.controller';

const router = Router();

router.post('/stkpush', mpesaController.initiateSTKPush);

export default router;
