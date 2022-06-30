const request = require('supertest');
const app = require('../server');

const RVuelo = {
	'CantAsientos': 5,
	'FechaReserva': '10/05/2021',
	'FechaFinReserva': '10/05/2021',
	'IdUsuario': 2,
	'IdVuelo': 1
};

const BuscarReservaVuelo = {
	'IdReservacion': 5000,
	'FechaReserva': '11/05/2021',
	'FechaFinReserva': '11/05/2021',
	'CantAsientos': 6
};

const BuscarReservaVueloEliminar = {
	'IdReserva': 5000
};

const ruta = '/v1/fullTrip/CreateReservacionVuelo';
const rutaget = '/v1/fullTrip/ReadReservacionVuelo';
const rutaupdate = '/v1/fullTrip/UpdateReservacionVuelo';
const rutadelete = '/v1/fullTrip/DeleteReservacionVuelo';

describe('POST / Registro Reserva Vuelo', () => {
	test('debería de responder un status 200 el registro de Reserva de Vuelo por usuario', async () => {
		const response = await request(app).post(ruta).send({ ...RVuelo });
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 400 el registro de Reserva Vuelo, Cantidad Asientos incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RVuelo, CantAsientos: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Vuelo, fecha incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RVuelo, FechaReserva: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Vuelo, fecha salida incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RVuelo, FechaFinReserva: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Vuelo, Usuario incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RVuelo, IdUsuario: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Vuelo, Vuelo incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RVuelo, IdVuelo: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 200 la lectura de Vuelos', async () => {
		const response = await request(app).get(rutaget);
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de reserva de Vuelo, Reserva no encontrado', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarReservaVuelo
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la edicion de la reserva de Vuelo, reserva editado correctamente', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarReservaVuelo, IdReservacion: 2, CantDias: 10
		});
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Reservacion de Vuelo a Eliminar, Reservacion no encontrado', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarReservaVueloEliminar
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la eliminación de Vuelo, Auto eliminado correctamente', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarReservaVueloEliminar, IdReserva: 2
		});
		expect(response.statusCode).toBe(200);
	});
});
