import { OrderCancelledEvent } from "@cpvtickets/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCancelledListener } from "../order-cancelled-listener"

const setUp = async () => {

    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = new mongoose.Types.ObjectId().toHexString();
    const ticket = Ticket.build({
        title: "title",
        price: 10,
        userId: ""
    });
    ticket.set({ orderId });
    await ticket.save();

    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id
        }
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { msg, data, listener, ticket, orderId };
}

it('updates the ticket, publishes an event and acks the message', async () => {
    const { msg, data, listener, ticket, orderId } = await setUp();

    await listener.onMessage(data, msg);
    
    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket?.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});