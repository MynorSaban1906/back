/* eslint-disable no-unused-vars */
const request = require('supertest');
const app = require('../server');

const user = {
	'Email': 'myemail@gmail.com',
	'Password': 'contra123'
};

const ruta = '/v1/fullTrip/Authentication';

describe('POST / LoginUser', () => {
	test('debería de responder un status 200 el inicio de sesion usuario', async () => {
		const response = await request(app).post(ruta).send({ ...user });
		expect(response.statusCode).toBe(200);
	});

	test('debería de responder un status 400 el Login de Usuario, correo incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...user, Email: 'incorrecto'
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el login de usuario, contraseña incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...user, Password: '123'
		});
		expect(response.statusCode).toBe(402);
	});
	test('debería de responder un status 400 el login de usuario, Usuario No Existe', async () => {
		const response = await request(app).post(ruta).send({
			...user, Email: 'NoExisto@gmail.com'
		});
		expect(response.statusCode).toBe(404);
	});
});
