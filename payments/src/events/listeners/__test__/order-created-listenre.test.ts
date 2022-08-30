import { OrderCreatedEvent } from "@cpvtickets/common";
import { OrderStatus } from "@cpvtickets/common/build/events/types/order-status";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";

const setUp = () => {

    const listener = new OrderCreatedListener(natsWrapper.client);

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        userId: '1234',
        expiresAt: "asd",
        version: 0,
        ticket: {
            id: "12324354",
            price: 20
        }
    }

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg };
};

it('replicates the order info', async () => {
    const { listener, data, msg } = await setUp();
    
    listener.onMessage(data, msg);

    const order = await Order.findById(data.id);

    expect(order?.price).toEqual(data.ticket.price);

});

it('acks the message', async () => {
    const { listener, data, msg } = await setUp();
    listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});