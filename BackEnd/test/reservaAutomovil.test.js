const request = require('supertest');
const app = require('../server');

const RAutomoviles = {
	'CantDias': 5,
	'FechaReserva': '13/05/2021',
	'FechaFinReserva': '18/05/2021',
	'IdUsuario': 2,
	'IdAuto': 2
};

const BuscarReservaAutomoviles = {
	'IdReservacion': 3000,
	'FechaReserva': '14/05/2021',
	'FechaFinReserva': '19/05/2021',
	'CantDias': 5
};

const BuscarReservaAutomovilesEliminar = {
	'IdReserva': 5000
};

const ruta = '/v1/fullTrip/CreateReservacionAuto';
const rutaget = '/v1/fullTrip/ReadReservacionAuto';
const rutaupdate = '/v1/fullTrip/UpdateReservacionAuto';
const rutadelete = '/v1/fullTrip/DeleteReservacionAuto';

describe('POST / Registro Reserva Habitacion', () => {
	test('debería de responder un status 200 el registro de Reserva de Habitacion por usuario', async () => {
		const response = await request(app).post(ruta).send({ ...RAutomoviles });
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 400 el registro de Reserva Automoviles, Cantidad Dias incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RAutomoviles, CantDias: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Automoviles, fecha incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RAutomoviles, FechaReserva: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Automoviles, fecha salida incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RAutomoviles, FechaFinReserva: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Automoviles, Usuario incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RAutomoviles, IdUsuario: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Automoviles, Automovil incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RAutomoviles, IdAuto: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 200 la lectura de Automoviles', async () => {
		const response = await request(app).get(rutaget);
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de reserva de Automovil, Reserva no encontrado', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarReservaAutomoviles
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la edicion de la reserva de automovil, reserva editado correctamente', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarReservaAutomoviles, IdReservacion: 2, CantDias: 10
		});
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Reservacion de Automovil a Eliminar, Reservacion no encontrado', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarReservaAutomovilesEliminar
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la eliminación de Automoviles, Auto eliminado correctamente', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarReservaAutomovilesEliminar, IdReserva: 2
		});
		expect(response.statusCode).toBe(200);
	});
});
