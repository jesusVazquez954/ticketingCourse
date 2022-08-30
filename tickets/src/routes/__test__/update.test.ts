import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import { Ticket } from '../../models/ticket';

const ticketRoute = '/api/tickets';
const userId = '34563898887387354';
it('returns 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`${ticketRoute}/${id}`)
        .send({
            title: 'title',
            price: 10
        })
        .expect(404);
});

it('returns 401 if the user is not authenticated', async () => {

});

it('returns 401 if the does not own the ticket', async () => {
    const response = await request(app)
        .post(ticketRoute)
        .send({
            title: 'titulo',
            price: 10
        })
        .expect(201);


    await request(app)
        .put(`${ticketRoute}/${response.body.id}`)
        .send({
            title: 'titulo2',
            price: 1000
        })
        .expect(401);
});

it('returns 400 if the user provides an invalid title or price', async () => {

});

it(' updates the ticket provided valid inputs', async () => {

});

it('rejects updates if the ticket is reserved', async () => {
    const response = await request(app)
        .post(ticketRoute)
        .send({
            title: 'titulo',
            price: 10
        });


    const ticket = await Ticket.findById(response.body.id);
    ticket?.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
    await ticket!.save();

    await request(app)
        .put(`${ticketRoute}/${response.body.id}`)
        .send({
            title: 'titulo2',
            price: 1000
        })
        .expect(400);
});