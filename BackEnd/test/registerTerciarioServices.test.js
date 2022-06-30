/* eslint-disable no-unused-vars */
const superTest = require('supertest');
const request = require('supertest');
const app = require('../server');
const connection = require('../config/connectDb2');

const user = {
	'nombre': 'Servicio Tercerizado',
	'correo': 'ServicioTerciario@gmail.com',
	'password': 'Contra12345',
	'ciudad': 2,
	'estado': 0
};

const ruta = '/v1/fullTrip/registrarServicio';

describe('POST / RegistroTerciario', () => {
	test('debería de responder un status 200 el registro de Servicio Terciario', async () => {
		const response = await request(app).post(ruta).send({ ...user });
		expect(response.statusCode).toBe(200);
	});

	test('debería de responder un status 400 el registro de Servicio Terciario, correo incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...user, correo: 'incorrecto'
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Servicio Terciario, contraseña incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...user, password: '123'
		});
		expect(response.statusCode).toBe(400);
	});
});
