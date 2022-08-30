import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttributes {
    username: string,
    email: string,
    password: string
}

interface UserDocument extends mongoose.Document {
    username: string,
    email: string,
    password: string
}

interface UserModel extends mongoose.Model<UserDocument> {
    build(attributes: UserAttributes): UserDocument;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        }, versionKey: false
    }
});

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashedPassword = await Password.toHash(this.get('password'));
        this.set('password', hashedPassword)
    }
    done();
});

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes)
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };