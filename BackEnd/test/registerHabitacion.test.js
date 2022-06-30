const request = require('supertest');
const app = require('../server');

const Habitacion = {
	'Precio': 1200,
	'Estado': 'Disponible',
	'FechaDisponible': '2022/05/15',
	'CantPersonas': 4,
	'Imagen': 'imagen',
	'IdServicio': 2
};
const BuscarHabitacion = {
	'IdHabitacion': 4000,
	'Precio': 1100,
	'Estado': 'Ocupado',
	'FechaDisponible': '15/02/2022',
	'CantPersonas': 3,
	'Imagen': 'Imagen nueva'
};

const BuscarHabitacionEliminar = {
	'IdHabitacion': 4000
};
const ruta = '/v1/fullTrip/CreateHabitacion';
const rutaget = '/v1/fullTrip/ReadHabitacion';
const rutaupdate = '/v1/fullTrip/UpdateHabitacion';
const rutadelete = '/v1/fullTrip/DeleteHabitacion';

describe('POST / Registro Habitacion', () => {
	test('debería de responder un status 200 el registro de Habitacion', async () => {
		const response = await request(app).post(ruta).send({ ...Habitacion });
		expect(response.statusCode).toBe(200);
	});

	test('debería de responder un status 400 el registro de Habitacion, Precio incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...Habitacion, Precio: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Habitacion, Estado incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Habitacion, Estado: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Habitacion, Fecha Incorrecta incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...Habitacion, FechaDisponible: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Habitacion, cantidad personas incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...Habitacion, CantPersonas: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Habitacion, imagen incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Habitacion, Imagen: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Habitacion, Servicio incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Habitacion, IdServicio: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Habitacion, imagen incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Habitacion, Imagen: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 200 la lectura de Habitaciones', async () => {
		const response = await request(app).get(rutaget);
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Habitaciones, Habitacion no encontrado', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarHabitacion
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la edicion de Habitacion, Habitacion editado correctamente', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarHabitacion, IdHabitacion: 2, CantPersonas: 5
		});
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Automovil a Eliminar, Auto no encontrado', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarHabitacionEliminar
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la eliminación de Automoviles, Auto eliminado correctamente', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarHabitacionEliminar, IdHabitacion: 2
		});
		expect(response.statusCode).toBe(200);
	});
});
