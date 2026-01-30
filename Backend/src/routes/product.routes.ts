import { Router } from 'express';
import { validate } from '../middleware/validate';
import { authenticate } from '../middleware/auth';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema';
import * as productController from '../controllers/product.controller';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', authenticate, validate(createProductSchema), productController.createProduct);

export default router;
