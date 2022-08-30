import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import { Ticket } from '../../models/ticket';

it('fetches an order', async () => {
    const ticket = await Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 1000
    });

    await ticket.save();

    const user = global.signin();

    //we use : name to rename a property
    //example: { property: nameWeWant }
    const { body: order } = await request(app)
        .post('/api/orders')
        .send({ ticketId: ticket.id })
        .expect(201);

    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${ticket.id}`)
        .send()
        .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);

});

it('returns an error if one user tries to fetch another users order', async () => {
    const ticket = await Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 1000
    });

    await ticket.save();

    const user = global.signin();

    //we use : name to rename a property
    //example: { property: nameWeWant }
    const { body: order } = await request(app)
        .post('/api/orders')
        .send({ ticketId: ticket.id })
        .expect(201);

    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${ticket.id}`)
        .send()
        .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);

});