import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';

const ticketGetRoute = '/api/tickets';

it('returns 404 if the ticket not exist', async () => {

    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`${ticketGetRoute}/${id}`)
        .expect(404);
});

it('returns 200 if the ticket is found', async () => {
    const title = 'Theater';
    const price = 20;

    const response = await request(app)
        .post(ticketGetRoute)
        .send({
            title,
            price
        })
        .expect(201);

    const ticketResponse = await request(app)
        .get(`${ticketGetRoute}/${response.body.id}`)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});