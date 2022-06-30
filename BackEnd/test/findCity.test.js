const request = require('supertest');
const app = require('../server');

const rutaget = '/v1/fullTrip/ViewCity';

describe('POST / Ver Ciudades', () => {
	test('debería de responder un status 200, ciudades encontrado', async () => {
		const response = await request(app).get(rutaget);
		expect(response.statusCode).toBe(200);
	});
});
