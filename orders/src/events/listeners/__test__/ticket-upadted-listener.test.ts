import { TicketUpdatedEvent } from "@cpvtickets/common";
import mongoose from "mongoose";
import { updateArrayBindingPattern } from "typescript";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedListener } from "../ticket-updated-listener";

const setUp = async () => {

    const listener = new TicketUpdatedListener(natsWrapper.client);

    const ticket = await Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'title',
        price: 12345
    });
    await ticket.save();

    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: "New Title",
        price: 954,
        userId: "asd"
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { msg, data, listener, ticket };
};

it('finds, updates and saves a ticket', async () => {
    const { msg, data, listener, ticket } = await setUp();

    await listener.onMessage(data, msg);

    const updateTicket = await Ticket.findById(ticket.id);

    expect(updateTicket?.title).toEqual(data.title);
    expect(updateTicket?.price).toEqual(data.price);
    expect(updateTicket?.version).toEqual(data.version);

});

it('acks the message', async () => {
    const { msg, data, listener } = await setUp();

    await listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a future version', async () => {
    const { msg, data, listener, ticket } = await setUp();
    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (error) {
    }

    expect(msg.ack).not.toHaveBeenCalled();
});