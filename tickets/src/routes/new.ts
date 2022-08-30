import { requireAuth } from "@cpvtickets/common";
import validateRequest from "@cpvtickets/common/build/middlewares/validate-request";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { TicketCreatedPubliser } from "../events/publishers/ticket-created-publisher";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post('/api/tickets', [
    body('title').not().isEmpty().withMessage('Title must be valid'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a number and greater than zero')
], validateRequest, async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const userId: string = '345678987654';
    const ticket = Ticket.build({
        title,
        price,
        userId
    });


    new TicketCreatedPubliser(natsWrapper.client).publish({
        id: ticket.id,
        version: ticket.version,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
    });
    console.log('entro');

    if (await ticket.save()) {
        return res.status(201).send(ticket);
    }

    res.status(409);

});

export { router as createTicketRouter };