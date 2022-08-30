import { Ticket } from "../ticket";

it('implements optimistic concurrecy control', async () => {

    const ticket = await Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123'
    });

    await ticket.save();

    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 12 });

    await firstInstance!.save();

    await secondInstance!.save();

    try {
        await secondInstance!.save();
    } catch (error) {
        return;
    }

    throw new Error('Should not reach this point');

});

it('increment the version number on multiple saves', async () => {

    const ticket = Ticket.build({
        title: 'title',
        price: 5,
        userId: '12345'
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    
    await ticket.save();
    expect(ticket.version).toEqual(1);

    await ticket.save();
    expect(ticket.version).toEqual(2);
});