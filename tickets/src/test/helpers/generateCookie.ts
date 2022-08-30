import jwt from "jsonwebtoken";

export const generateCookie = (): string[] => {

    const payload = {
        id: '12345678',
        email: 'test@test.com'
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session = { jwt: token };

    const sessionJSON = JSON.stringify(session);

    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`session=${base64}`];
}

