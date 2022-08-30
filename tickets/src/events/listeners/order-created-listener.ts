import { Listener, OrderCreatedEvent, Subjects } from "@cpvtickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket"; 
import { TicketUpdatedPubliser } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {

        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Ticket not found');
        }
        ticket.set({ orderId: data.id });
        await ticket.save();

        await new TicketUpdatedPubliser(this.client).publish({
            id: ticket.id,
            price: ticket. price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version  
        });

        msg.ack();

    }

}