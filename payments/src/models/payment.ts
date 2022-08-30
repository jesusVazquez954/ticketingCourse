import mongoose from "mongoose";

interface PaymentAttributes {
    orderId: string;
    stripeId: string;
}

interface PaymentDocuments extends mongoose.Document {
    orderId: string;
    stripeId: string;
}

interface PaymentModel extends mongoose.Model<PaymentDocuments> {
    build(attrs: PaymentAttributes): PaymentDocuments;
}

const paymentSchema = new mongoose.Schema({
    orderId: {
        required: true,
        type: String,
    },
    stripeId: {
        required: true,
        type: String,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

paymentSchema.statics.build = (attrs: PaymentAttributes) => {
    return new Payment(attrs);
}

const Payment = mongoose.model<PaymentDocuments, PaymentModel>('Payment', paymentSchema);

export { Payment };