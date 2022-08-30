import { Publisher } from '@cpvtickets/common/build/events/base-publisher';
import { Subjects } from '@cpvtickets/common/build/events/subjects';
import { TicketCreatedEvent } from '@cpvtickets/common/build/events/ticket-created-event';

export class TicketCreatedPubliser extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}