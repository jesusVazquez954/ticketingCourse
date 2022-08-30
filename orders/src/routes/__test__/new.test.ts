import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('returns an error if the ticket does not exist', async () => {

    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .send({ ticketId })
        .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {

    const ticket = await Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Test',
        price: 10000
    });
    await ticket.save();

    const order = await Order.build({
        ticket,
        userId: 'sadfg',
        expiresAt: new Date(),
        status: OrderStatus.Created
    });
    await order.save();

    await request(app)
        .post('/api/orders')
        .send({ ticketId: ticket.id })
        .expect(400);

});

it('reserves a ticket', async () => {

    const ticket = await Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Test',
        price: 10000
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .send({ ticketId: ticket.id })
        .expect(201);
});

it('emits an order created event', async () => {

    const ticket = await Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Test',
        price: 10000
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .send({ ticketId: ticket.id })
        .expect(201);
    
    expect(natsWrapper).toHaveBeenCalled();
});