import request from 'supertest';
import app from '../../app';

const ticketRoute = '/api/tickets'
const createTicket = () => {
    return request(app)
        .post(ticketRoute)
        .send({
            title: 'Titile',
            price: 10
        });

};

it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get(ticketRoute)
        .expect(200);
    
    expect(response.body.length).toEqual(2);
});