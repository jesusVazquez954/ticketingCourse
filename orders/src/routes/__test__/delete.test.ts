import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('marks an order as cancelled', async () => {

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 100
    });
    await ticket.save();

    const { body: order } = await request(app)
        .post('/api/orders')
        .send({ ticketId: ticket.id })
        .expect(201);

    await request(app)
        .delete('/api/orders')
        .send()
        .expect(204);

    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async () => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 100
    });
    await ticket.save();

    const { body: order } = await request(app)
        .post('/api/orders')
        .send({ ticketId: ticket.id })
        .expect(201);

    await request(app)
        .delete('/api/orders')
        .send()
        .expect(204);

    expect(natsWrapper.client).toHaveBeenCalled();  
});