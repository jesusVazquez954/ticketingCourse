import request from "supertest";
import app from "../../app";

const signUpRoute = '/api/users/signup';
process.env.JWT_KEY = 'MassEffect';
it('Returns a 201 on succesful signup', async () => {

    return request(app)
        .post(signUpRoute)
        .send({
            username: "V",
            email: "email@email.com",
            password: "email.123"
        })
        .expect(201);
});

it('Returns a 400 with an invalid email', async () => {

    return request(app)
        .post(signUpRoute)
        .send({
            username: "V",
            email: "badEmail.com",
            password: "email.123"
        })
        .expect(400);
});

it('Returns a 400 with an invalid password', async () => {

    return request(app)
        .post(signUpRoute)
        .send({
            username: "V",
            email: "email@email.com",
            password: "asd"
        })
        .expect(400);
});

it('Returns a 400 with missing password and email', async () => {

    await request(app)
        .post(signUpRoute)
        .send({ email: "valid@email.com" })
        .expect(400);

    await request(app)
        .post(signUpRoute)
        .send({
            password: "asdss"
        })
        .expect(400);
});

it('Disallows to use the same email', async () => {
    await request(app)
        .post(signUpRoute)
        .send({
            username: "V",
            email: "email@email.com",
            password: "validPassword"
        })
        .expect(201);

    await request(app)
        .post(signUpRoute)
        .send({
            username: "V",
            email: "email@email.com",
            password: "validPassword"
        })
        .expect(400);
});

it('Sets a cookie after succesful signup', async () => {

    const response = await request(app)
        .post(signUpRoute)
        .send({
            username: "V",
            email: "email@email.com",
            password: "validPassword"
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});