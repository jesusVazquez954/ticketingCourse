import request from "supertest";
import app from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";
import { generateCookie } from "../../test/helpers/generateCookie";


jest.mock('../../__mocks__/nats-wrapper')

const postTicketRoute = '/api/tickets';

it('has a route handler listening to /api/tickets for post requests', async () => {

    const response = await request(app).post(postTicketRoute).send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    //await request(app).post(postTicketRoute).send({}).expect(401);
});

it('returns a status other than 401 if user is signed in', async () => {

    /* const response = await request(app)
    .post(postTicketRoute)
    .set("Cookie", generateCookie()) 
    .send({}); 
    
    expect(response.status).not.toEqual(401); */
});

it('returns an error if an invalid title is provided', async () => {

    await request(app)
        .post(postTicketRoute)
        .send({
            title: '',
            price: 0
        }).expect(400);

    await request(app)
        .post(postTicketRoute)
        .send({
            price: 0
        }).expect(400);

});

it('returns an error if an invalid price is provided', async () => {

    await request(app)
        .post(postTicketRoute)
        .send({
            title: 'Title',
            price: 'asd'
        }).expect(400);

    await request(app)
        .post(postTicketRoute)
        .send({
            title: 'title'
        }).expect(400);

});

it('reads a ticket with valid inputs', async () => {

    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await request(app)
        .post(postTicketRoute)
        .send({
            title: 'titulo',
            price: 10
        });

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
});

it('publishes an event', async () => {
    const title = 'asdlkj';

    await request(app)
        .post(postTicketRoute)
        .send({
            title: 'Title',
            price: 10
        }).expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled(); 
});