import { OrderCancelledEvent } from "@cpvtickets/common";
import { OrderStatus } from "@cpvtickets/common/build/events/types/order-status";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setUp = async () => {

    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = await Order.buid({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        userId: "qew",
        price: 222,
        status: OrderStatus.Cancelled
    });
    await order.save();

    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        version: 1,
        ticket: {
            id: "ad"
        }
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, msg, data, order };
};

it('updates the status of the order', async () => {
    const { listener, msg, data, order } = await setUp();

    await listener.onMessage(data, msg);

    const updateOrder = await Order.findById(order.id);

    expect(updateOrder?.status).toEqual(OrderStatus.Cancelled);

});

it('', async () => {
    const { listener, msg, data, order } = await setUp();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});