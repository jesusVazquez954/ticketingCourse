import request from "supertest"
import app from "../../app"

const signUpRoute = '/api/users/signup';

export const getAuthCookie = async (): Promise<string[]> => {

    const response = await request(app)
        .post(signUpRoute)
        .send({
            username: "V",
            email: "email@email.com",
            password: "password"
        })
        .expect(201); 
    
    const cookie = response.get('Set-Cookie'); 
    
    return cookie;
}