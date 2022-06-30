const request = require('supertest');
const app = require('../server');

const Perfil = {
	'IdUsuario': 4000
};
const rutaget = '/v1/fullTrip/ReservacionesUser';

describe('POST / Ver reservas usuario', () => {
	test('debería de responder un status 200, Reservaciones encontradas ', async () => {
		const response = await request(app).get(rutaget).send({ ...Perfil });
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 400, reservas no encontradas encontrado', async () => {
		const response = await request(app).get(rutaget).send({ ...Perfil, IdUsuario: '' });
		expect(response.statusCode).toBe(400);
	});
});
