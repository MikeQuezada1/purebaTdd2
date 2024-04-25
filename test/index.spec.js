import app from '../src/app.js';
import request from 'supertest';


describe('/login', () => {
    
    test('responds with failed message when email or password are missing', async () => {
        const response = await request(app)
            .post('/login')
            .send({});

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Invalid email or password');
    });

    test('responds with error message when invalid password is provided', async () => {
        const response = await request(app)
          .post('/login')
          .send({ email: 'user1@example.com', password: 'invalidpassword' });
    
        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Invalid email or password');
    });

    it('responds with error message when invalid email is provided', async () => {
        const response = await request(app)
          .post('/login')
          .send({ email: 'invalid@gamil.com', password: '12345' });
    
        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Invalid email or password');
      });
    
      test('responds with success message and user data when valid email and password are provided', async () => {
        const response = await request(app)
          .post('/login')
          .send({ email: 'user@gmail.com', password: '12345' });
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('login succesful');
        expect(response.body.user).toEqual({ id: 1, email: 'user@gmail.com', password: '12345' });
      });
})