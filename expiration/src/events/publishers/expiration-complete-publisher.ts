import { ExpirationCompleteEvent, Publisher, Subjects } from "@cpvtickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}