import { OrderCreatedEvent, Publisher, Subjects } from "@cpvtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}
 