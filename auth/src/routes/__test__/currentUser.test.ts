import request from "supertest";
import app from "../../app";
import { getAuthCookie } from "../../test/helpers/getAuthCookie";

const currentUserRoute = '/api/users/currentuser';
process.env.JWT_KEY = 'MassEffect';

it('Returns information about the user', async () => {

    const cookie = await getAuthCookie();
    
    const response = await request(app)
        .get(currentUserRoute)
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('email@email.com');
});

it('Responds with null if not authenticated', async () => {
    return request(app).
        get(currentUserRoute)
        .send()
        .expect(401);
});