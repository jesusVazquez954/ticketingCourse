import request from "supertest";
import app from "../../app";

const signOutRoute = '/api/users/signout'; 
const signUpRoute = '/api/users/signup';
process.env.JWT_KEY = 'MassEffect';

it('Returns 200 if the cookie is deleted', async () => {

    await request(app)
        .post(signUpRoute)
        .send({
            username: "V",
            email: "email@email.com",
            password: "password"
        })
        .expect(201);


    const response = await request(app)
        .post(signOutRoute)
        .expect(200);

    expect(response.get('Set-Cookie')[0]).toEqual(
        'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
});