import { Publisher } from '@cpvtickets/common/build/events/base-publisher';
import { Subjects } from '@cpvtickets/common/build/events/subjects';
import { TicketUpdatedEvent } from '@cpvtickets/common/build/events/ticket-updated-event';

export class TicketUpdatedPubliser extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}