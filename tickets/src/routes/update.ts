import { BadRequestError, NotAuthorizedError, NotFoundError } from '@cpvtickets/common';
import express, { Request, Response } from 'express';
import { TicketUpdatedPubliser } from '../events/publishers/ticket-updated-publisher';
import { Ticket } from '../models/ticket';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/tickets/:id', async (req: Request, res: Response) => {

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }

    if (ticket.orderId) {
        throw new BadRequestError('Cannot edit a reserved ticket');
    }

    if (ticket.userId !== '34563898887387354') {
        throw new NotAuthorizedError();
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price,
    });
    await ticket.save();

    new TicketUpdatedPubliser(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version
    });

    res.send(ticket);
});

export { router as updateTicketRouter };