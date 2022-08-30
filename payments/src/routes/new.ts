import { BadRequestError, NotAuthorizedError, NotFoundError } from "@cpvtickets/common";
import { OrderStatus } from "@cpvtickets/common/build/events/types/order-status";
import validateRequest from "@cpvtickets/common/build/middlewares/validate-request";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { PaymentCreatedPublisher } from "../events/pubishers/payment-created-publisher";
import { Order } from "../models/order";
import { Payment } from "../models/payment";
import { natsWrapper } from "../nats-wrapper";
import { stripe } from "../stripe";

const router = Router();

router.post('/api/payments', [
    body('token').not().isEmpty(),
    body('orderId').not().isEmpty(),
    validateRequest
], async (req: Request, res: Response) => {

    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser?.id) {
        throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
        throw new BadRequestError('Cannot pay for a cancelled order');
    }

    //We use stripe to charge a credit card
    //To make tests we can pass the token: tok_visa
    const charge = await stripe.charges.create({
        currency: 'usd',
        amount: order.price * 1000,
        source: token
    });

    const payment = Payment.build({
        orderId,
        stripeId: charge.id
    });
    await payment.save();

    await new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        stripeId: payment.stripeId
    });

    res.status(201).send({ id: payment.id });

});

export { router as createChargeRouter };