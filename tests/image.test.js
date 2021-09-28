const app = require('../config/express')();
const request = require('supertest')(app);
const { response } = require('express');
const faker = require('faker');
require('../config/database');

let imageId = null;
let imagesIds = [];

describe('Image', () => {
    it('GET /image/id should return the image object', () => {
        return request.get('/api/image/61516dee031cb0eb1dd6e476').expect('Content-Type', /json/).expect(200).then(response => {
            expect(response.body.url).toEqual(expect.any(String));
        });
    });

    it('GET /image/id should return 404 if not found', () => {
        return request.get('/api/image/61516dee031cb0eb1dd6e479').expect(404);
    });

    it('GET /image/id should return 422 if input is invalid', () => {
        return request.get('/api/image/9999999999').expect(422);
    });

    it('POST /image should return the created image object', () => {
        const url = faker.image.imageUrl();
        const publisherId = "61515854031cb0eb1dd6e457";
        return request.post("/api/image/").send({ url, publisherId }).expect(200).then(response => {
            expect(response.body.url).toEqual(url);
            expect(response.body.publisherId).toEqual(publisherId);
            imageId = response.body._id;
        })
    });

    it('POST /image as private should return the created image object', () => {
        const url = faker.image.imageUrl();
        const publisherId = "61515854031cb0eb1dd6e457";
        return request.post("/api/image/").send({ url, publisherId, isPrivate: true }).expect(200).then(response => {
            expect(response.body.url).toEqual(url);
            expect(response.body.publisherId).toEqual(publisherId);
            expect(response.body.isPrivate).toEqual(true);
        })
    });

    it('POST /image should return 422 if input is invalid', () => {
        return request.post("/api/image/").send({}).expect(422);
    });

    it('DELETE /image/id should return the deleted image object', () => {
        return request.delete(`/api/image/${imageId}`).expect(200).then(response => {
            expect(response.body._id).toEqual(imageId);
        })
    });

    it('DELETE /image/id should return 404 if not found', () => {
        return request.delete('/api/image/61516dee031cb0eb1dd6e479').expect(404);
    });

    it('DELETE /image/id should return 422 if input is invalid', () => {
        return request.delete('/api/image/9999999999').expect(422);
    });
})

describe('Multiple images', () => {
    it('GET /images/publisherId should return the object with the images array and pagination', () => {
        return request.get('/api/images/61515854031cb0eb1dd6e457').expect('Content-Type', /json/).expect(200).then(response => {
            expect(response.body.images).toEqual(expect.any(Array));
        });
    });

    it('POST /images should return the created images array', () => {
        const images = [
            { url: faker.image.imageUrl(), publisherId: "61515854031cb0eb1dd6e457" },
            { url: faker.image.imageUrl(), publisherId: "61515854031cb0eb1dd6e457" },
            { url: faker.image.imageUrl(), publisherId: "61515854031cb0eb1dd6e457" },
            { url: faker.image.imageUrl(), publisherId: "61515854031cb0eb1dd6e457" }
        ];

        return request.post("/api/images/").send({ images: images }).expect(200).then(response => {
            expect(response.body.length).toEqual(images.length);
            response.body.map(obj => imagesIds.push(obj._id));
        })
    });

    it('POST /image should return 422 if input is invalid', () => {
        return request.post("/api/images/").send({}).expect(422);
    });

    it('DELETE /images should return the deleted image object', () => {
        return request.delete(`/api/images`).send({ images: imagesIds }).expect(200).then(response => {
            expect(response.body.deletedCount).toEqual(expect.any(Number));
        })
    });

    it('DELETE /images should return 404 if not found', () => {
        const images = ["615169fe7fe3d3fae17c49ec", "61516a007fe3d3fae17c49ee"];
        return request.delete(`/api/images`).send({ images }).expect(404);
    });

    it('DELETE /images should return 422 if input is invalid', () => {
        const images = ["9999999", "888888888"];
        return request.delete(`/api/images`).send({ images }).expect(422);
    });
})