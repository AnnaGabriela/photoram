const app = require('../config/express')();
const request = require('supertest')(app);
const faker = require('faker');
require('../config/database');

describe('User', () => {
    it('GET /user/id should return the user object', () => {
        return request.get('/api/user/61515854031cb0eb1dd6e457').expect('Content-Type', /json/).expect(200).then(response => {
            expect(response.body.name).toEqual(expect.any(String));
            expect(response.body.email).toEqual(expect.any(String));
        });
    });

    it('GET /user/id should return 404 if not found', () => {
        return request.get('/api/user/61515854031cb0eb1dd6e458').expect(404);
    })

    it('GET /user/id should return 422 if input is invalid', () => {
        return request.get('/api/user/999999999').expect(422);
    })

    it('POST /user/ => created user object', () => {
        const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
        const email = faker.internet.email();
        return request.post("/api/user/").send({ name, email }).expect(200).then(response => {
            expect(response.body.name).toEqual(name);
            expect(response.body.email).toEqual(email);
        })
    })
})