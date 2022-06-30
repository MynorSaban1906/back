const request = require('supertest');
const app = require('../server');

const RHabitacion = {
	'CantHabitaciones': 2,
	'FechaIngreso': '15/05/2022',
	'FechaSalida': '17/05/2022',
	'IdUsuario': 2,
	'IdHabitacion': 2
};

const BuscarReservaHabitacion = {
	'IdReservacion': 5000,
	'FechaIngreso': '20/08/2022',
	'FechaSalida': '22/09/2022',
	'CantHabitaciones': 3
};

const BuscarReservaHabitacionEliminar = {
	'IdReserva': 5000
};

const ruta = '/v1/fullTrip/CreateReservacionHabitacion';
const rutaget = '/v1/fullTrip/ReadReservacionHabitacion';
const rutaupdate = '/v1/fullTrip/UpdateReservacionHabitacion';
const rutadelete = '/v1/fullTrip/DeleteReservacionHabitacion';

describe('POST / Registro Reserva Habitacion', () => {
	test('debería de responder un status 200 el registro de Reserva de Habitacion por usuario', async () => {
		const response = await request(app).post(ruta).send({ ...RHabitacion });
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 400 el registro de Reserva Habitacion, Cantidad Habitaciones incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RHabitacion, CantHabitaciones: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Habitacion, fecha incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RHabitacion, FechaIngreso: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Habitacion, fecha salida incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RHabitacion, FechaSalida: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Habitacion, Usuario incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RHabitacion, IdUsuario: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Reserva de Habitacion, Habitacion incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...RHabitacion, IdHabitacion: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 200 la lectura de habitaciones', async () => {
		const response = await request(app).get(rutaget);
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de reserva de habitacion, Reserva no encontrado', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarReservaHabitacion
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la edicion de la reserva, Resenia editado correctamente', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarReservaHabitacion, IdReservacion: 2, CantHabitaciones: 10
		});
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Reservacion de hotel a Eliminar, Reservacion no encontrado', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarReservaHabitacionEliminar
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la eliminación de Automoviles, Auto eliminado correctamente', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarReservaHabitacionEliminar, IdReserva: 2
		});
		expect(response.statusCode).toBe(200);
	});
});
