import { OrderCancelledEvent, Publisher, Subjects } from "@cpvtickets/common"; 

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
}