import { randomBytes } from 'crypto';
import stan from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();
const localhost = 'http://127.0.0.1';

const client = stan.connect('ticketing', randomBytes(4).toString('hex'), {
    url: `${localhost}:4222`
});

client.on('connect', () => {
    console.log('Listener connected');

    client.on('close', () => {
        console.log('CLOSING... D:');
        process.exit();
    });

    new TicketCreatedListener(client).listen();
});

process.on('SIGINT', () => client.close());
process.on('SIGTERM', () => client.close());
