import { BadRequestError, NotFoundError } from '@cpvtickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { OrderCreatedPublisher } from '../events/publisher/order-created-publisher';
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';
import { natsWrapper } from '../nats-wrapper';
import { OrderStatus } from '../types/order-status';

const router = express.Router();

const EXPIRATION_IN_SECONDS = 15 * 60;

router.post('/api/orders', [
    body('ticketId').not().isEmpty().withMessage('TicketId must be provided')
], async (req: Request, res: Response) => {

    const { ticketId } = req.body;
    const ticket = await Ticket.findById({ ticketId });
    if (!ticket) {
        throw new NotFoundError();
    }
    if (await ticket.isReserved()) {
        throw new BadRequestError('Ticket is already reserved');
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_IN_SECONDS);

    const order = Order.build({
        userId: '',
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket
    });

    if (! await order.save()) {
        return res.status(500).send({ msg: 'Problems saving the user' });
    }

    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        version: order.version,
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    });

    res.status(201).send(order);
});

export { router as newOrderRouter };