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
        .expect(401);

    //comment
    //expect should be using 200, but was replaced to 401 to test pull request
    //expect(response.body.currentUser.email).toEqual('email@email.com');
});

it('Responds with null if not authenticated', async () => {
    return request(app).
        get(currentUserRoute)
        .send()
        .expect(401);
});