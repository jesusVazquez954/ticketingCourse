import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', async (req: Request, res: Response) => {

    try {

        //To relate the databases we use populate
        const orders = Order.find({ userId: req.currentUser!.id }).populate('ticket');
        res.send(orders);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

export { router as indexOrderRouter };