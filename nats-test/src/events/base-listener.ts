import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], msg: Message): void;

    private client: Stan;
    protected ackWaitTime = 5 * 1000;

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWaitTime)
            .setDurableName(this.queueGroupName);
        //setDeliverAllAvailable = get the data stored
        //setDurableName - keep track of our events
    }

    listen() {

        const suscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
            //this.queueGroupName - keeps data alive even if the system shuts down
            //also creates a group so the message is only sent to one service
        );


        suscription.on('message', (msg: Message) => {

            console.log(`Message received ${this.subject} / ${this.queueGroupName}`);

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }

    parseMessage(msg: Message) {
        const data = msg.getData();

        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf-8'));
    }
}