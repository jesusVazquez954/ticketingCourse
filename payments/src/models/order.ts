import { OrderStatus } from "@cpvtickets/common/build/events/types/order-status";
import mongoose, { mongo } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

//What we need to create an order
interface OrderAttributes {
    id: string;
    version: number;
    userId: string;
    price: number;
    status: OrderStatus;
}

//Properties our Order has
//const order = await Order.findBy();
//order.example  <--
interface OrderDocuments extends mongoose.Document {
    version: number;
    userId: string;
    price: number;
    status: OrderStatus;
}

//Properties our Model has Order.example <--     
interface OrderModel extends mongoose.Model<OrderDocuments> {
    buid(attributes: OrderAttributes): OrderDocuments;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(document, returnValue) {
            returnValue.id = returnValue._id;
            delete returnValue._id;
        }
    }
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.buid = (attributes: OrderAttributes) => {
    return new Order({
        _id: attributes.id,
        version: attributes.version,
        userId: attributes.userId,
        price: attributes.price,
        status: attributes.status,
    });
}

const Order = mongoose.model<OrderDocuments, OrderModel>('Order', orderSchema);

export { Order };

