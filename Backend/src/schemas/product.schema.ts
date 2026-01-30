import { z } from 'zod';

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        description: z.string().min(1, 'Description is required'),
        price: z.number().positive('Price must be positive'),
        imageUrl: z.string().url('Invalid image URL'),
        category: z.string().optional(),
        stock: z.number().int().nonnegative('Stock must be non-negative').optional(),
    }),
});

export const updateProductSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, 'ID must be a number'),
    }),
    body: z.object({
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        price: z.number().positive().optional(),
        imageUrl: z.string().url().optional(),
        category: z.string().optional(),
        stock: z.number().int().nonnegative().optional(),
    }),
});
