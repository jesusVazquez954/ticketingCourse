import { PaymentCreatedEvent, Publisher, Subjects } from "@cpvtickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;
} 