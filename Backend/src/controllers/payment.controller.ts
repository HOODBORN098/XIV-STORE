import { Request, Response } from 'express';
import { stripe } from '../lib/stripe';
import prisma from '../lib/prisma'; // Optional: if we want to save order

export const createPaymentIntent = async (req: Request, res: Response) => {
    const { items } = req.body;

    // Calculate total price on server side to prevent manipulation
    // This is a simplified version. In real app, fetch prices from DB.
    // For now we will trust the client or re-fetch based on IDs.

    // Robust approach: Fetch products from DB based on item IDs
    let total = 0;
    for (const item of items) {
        const product = await prisma.product.findUnique({ where: { id: parseInt(item.id) } });
        if (product) {
            total += product.price * item.quantity;
        }
    }

    // Add tax and shipping (Updated to match Frontend KES rules)
    const shipping = total > 10000 ? 0 : 500;
    const tax = total * 0.08;
    const finalAmount = Math.round((total + shipping + tax) * 100); // Stripe expects amounts in subunits (cents/cents equivalent)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: finalAmount,
            currency: 'kes',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
};
