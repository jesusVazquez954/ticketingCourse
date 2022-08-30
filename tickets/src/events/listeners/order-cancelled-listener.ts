import { Listener, NotFoundError, OrderCancelledEvent, Subjects } from "@cpvtickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPubliser } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {

        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Not found ticket');
        }

        ticket.set({ orderId: undefined });

        new TicketUpdatedPubliser(this.client).publish({
            id: ticket.id,
            version: ticket.version,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId
        });

        msg.ack();
    }

}