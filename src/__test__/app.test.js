const request = require('supertest');
const routes = require('../../src/routes');
const routeApi = require('../../src/routes/googleAPI');

describe('GET request testing', () => {
    test('should return 200 ok, init route', () => {
        const response = request(routes).get('/').send();
        expect(response.status);
    });

    test('should return 200 ok, apiGoogle route', () => {
        const response = request(routes).get('/api').send();
        expect(response.status);
    });

    test('should return 200 ok, api Google route', () => {
        const response = request(routes).get('/api/googleAPI').send();
        expect(response.status);
    });

    test('should return 500 ok, error handler', () => {
        const response = request(routes).get('/error').send();
        expect(response.status);
    });

    test('should return 200 ok, favicon route', () => {
        const response = request(routes).get('/favicon.ico').send();
        expect(response.status);
    });

    test('Test process SIGTERM handler', () => {
        process.emit('SIGTERM');
        expect(process.exit);
    });

    test('test port', () => {
        const port = process.env.PORT || 9000;
        expect(port);
    });
});