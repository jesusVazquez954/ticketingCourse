import request from 'supertest';
import app from "../../app";

const signInRoute = '/api/users/signin';
const signUpRoute = '/api/users/signup';
process.env.JWT_KEY = 'MassEffect';

it('Fails when an email that does not exist is supplied', async () => {
    await request(app)
        .post(signInRoute)
        .send({
            email: "email@email.com",
            password: "password"
        })
        .expect(400);
});


it('Fails when an incorrect password is provided', async () => {

    await request(app)
        .post(signUpRoute)
        .send({
            username: "V",
            email: "email@email.com",
            password: "password"
        })
        .expect(201);

    await request(app)
        .post(signInRoute)
        .send({
            email: "email@email.com",
            password: "incorrectPassword"
        })
        .expect(400);
});

it('Responds with a cookie when given valid credentials', async () => {

    await request(app)
        .post(signUpRoute)
        .send({
            username: "V",
            email: "email@email.com",
            password: "password"
        })
        .expect(201);

    const response = await request(app)
        .post(signInRoute)
        .send({
            email: "email@email.com",
            password: "password"
        })
        .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
});