import { Router, Request, Response } from 'express';
import productRoutes from './product.routes';
import authRoutes from './auth.routes';
import customerAuthRoutes from './customer.auth.routes';
import paymentRoutes from './payment.routes';
import mpesaRoutes from './mpesa.routes';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.json({ message: 'Server is running', status: 'OK' });
});

router.use('/auth', authRoutes); // Admin auth
router.use('/customer', customerAuthRoutes); // Customer auth
router.use('/payment', paymentRoutes);
router.use('/mpesa', mpesaRoutes);
router.use('/products', productRoutes);

export default router;
