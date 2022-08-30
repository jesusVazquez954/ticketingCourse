import mongoose from 'mongoose';
import request from 'supertest';
import { Ticket } from '../../models/ticket';

const buildTicket = async () => {
    const ticket = await Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'TEST',
        price: 100
    });
    await ticket.save();
    return ticket;
}

it('fetches orders for a particular user', async () => {

    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();

    
});