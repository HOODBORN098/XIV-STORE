import { Request, Response } from 'express';

export const initiateSTKPush = async (req: Request, res: Response) => {
    const { phoneNumber, amount } = req.body;

    if (!phoneNumber || !amount) {
        return res.status(400).json({ error: 'Phone number and amount are required' });
    }

    // In a real application, you would:
    // 1. Authenticate with Safaricom to get an access token
    // 2. Make a request to the STK Push endpoint

    // For this simulation, we will mock the successful initiation
    console.log(`[Mock M-Pesa] Initiating STK Push to ${phoneNumber} for KES ${amount}`);

    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({
        ResponseCode: "0",
        ResponseDescription: "Success. Request accepted for processing",
        CustomerMessage: "Success. Request accepted for processing"
    });
};
