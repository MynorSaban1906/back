/* eslint-disable no-unused-vars */
const superTest = require('supertest');
const request = require('supertest');
const app = require('../server');
const connection = require('../config/connectDb2');

const user = {
	'Name': 'Prueba 111010',
	'TypeUser': 1,
	'Date': '2019/05/20',
	'Email': 'myemail@gmail.com',
	'Password': 'contra123'
};
/*
describe('', () => {
	beforeEach(() => {
		connection.pool.getConnection = () => new Promise((resolve) => {
			resolve(1);
		});
	});

	test('ownerPost - 201 ok - 2', async (done) => {
		connection.query = (() => new Promise((resolve) => resolve({ rows: [] })));
		superTest(app)
			.get('/v1/fullTrip/getMarcaVehicles/Toyota')
			.end((err, res) => {
				expect(res.status).toBe(200);
				done();
			});
	});
});
*/
/*
it('Registro completado ', async (done) => {
	await openConnection();
	const response = await request.post(config.get('localServer.servicePathRegisterService'))
		.set('Content-Type', 'application/json').send(user);
	expect(response.status).toBe(201);
	done();
});
*/
describe('POST / RegistroUSUARIO', () => {
	test('debería de responder un status 200 el registro de usuario', async () => {
		const response = await request(app).post('/v1/fullTrip/register/services').send({
			'Name': 'PruebaUnitaria',
			'Date': '2002/02/12',
			'Email': 'pruebaU@hotmail.com',
			'Password': '123456789',
			'TypeUser': '1'
		});
		expect(response.statusCode).toBe(200);
	});

	test('debería de responder un status 400 el registro de usuario, correo incorrecto', async () => {
		const response = await request(app).post('/v1/fullTrip/register/services').send({
			'Name': 'PruebaUnitaria',
			'Date': '2002/02/12',
			'Email': 'pruebaU',
			'Password': '123456789',
			'TypeUser': '1'
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de usuario, contraseña incorrecta', async () => {
		const response = await request(app).post('/v1/fullTrip/register/services').send({
			'Name': 'PruebaUnitaria',
			'Date': '2002/02/12',
			'Email': 'pruebaU@gmail.com',
			'Password': '123',
			'TypeUser': '1'
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de usuario, Nombre vacio', async () => {
		const response = await request(app).post('/v1/fullTrip/register/services').send({
			'Name': '',
			'Date': '2002/02/12',
			'Email': 'pruebaU@gmail.com',
			'Password': '123456789',
			'TypeUser': '1'
		});
		expect(response.statusCode).toBe(400);
	});
});
