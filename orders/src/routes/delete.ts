import { NotAuthorizedError, NotFoundError } from '@cpvtickets/common';
import express, { Request, Response } from 'express';
import { OrderCancelledPublisher } from '../events/publisher/order-cancelled-publisher';
import { Order, OrderStatus } from '../models/order';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {

    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('ticket');
    if (!order) {
        throw new NotFoundError();
    }
    if (order.userId !== req.currentUser?.id) {
        throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    if (await order.save()) {
        return res.status(204).send();
    }

    new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        ticket: {
            id: order.ticket.id
        }
    });

    res.status(500).send({ msg: 'Server Error' });
});

export { router as deleteOrderRouter };