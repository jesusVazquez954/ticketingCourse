import nats from 'node-nats-streaming';
import { TicketCreatedPubliser } from './events/ticket-created-publisher';


console.clear();
const localhost = 'http://127.0.0.1';
const client = nats.connect('ticketing', 'abc', {
    url: `${localhost}:4222`
});


client.on('connect', async () => {

    const publiser = new TicketCreatedPubliser(client);
    await publiser.publish({ id: "2", title: "title", price: 10 });

});