const request = require('supertest');
const app = require('../server');

const Vuelo = {
	'FechaVuelo': '22/06/2021',
	'AsientosDisponibles': 150,
	'Precio': 250.0,
	'IdServicio': 5,
	'IdCiudad': 2,
	'Imagen': 'imagen'
};
const BuscarVuelo = {
	'IdVuelo': 4000,
	'FechaVuelo': '22/06/2021',
	'AsientosDisponibles': 150,
	'Precio': 250.0,
	'IdCiudad': 2,
	'Imagen': 'imagen',
	'Activo': 1
};

const BuscarVueloEliminar = {
	'IdVuelo': 4000
};
const ruta = '/v1/fullTrip/CreateVuelo';
const rutaget = '/v1/fullTrip/ReadVuelo';
const rutaupdate = '/v1/fullTrip/UpdateVuelo';
const rutadelete = '/v1/fullTrip/DeleteVuelo';

describe('POST / Registro Vuelo', () => {
	test('debería de responder un status 200 el registro de Vuelo', async () => {
		const response = await request(app).post(ruta).send({ ...Vuelo });
		expect(response.statusCode).toBe(200);
	});

	test('debería de responder un status 400 el registro de Vuelo, Fecha de vuelo incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Vuelo, FechaVuelo: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Automovil, Asientos disponibles incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...Vuelo, AsientosDisponibles: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Automovil, Precio incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...Vuelo, Precio: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Automovil, IdServicio incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...Vuelo, IdServicio: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Automovil, IdCiudad incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Vuelo, IdCiudad: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Vuelo, imagen incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Vuelo, Imagen: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 200 la lectura de Vuelos', async () => {
		const response = await request(app).get(rutaget);
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Vuelos, Vuelo no encontrado', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarVuelo
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la edicion de Vuelos, Vuelo editado correctamente', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarVuelo, IdVuelo: 2, AsientosDisponibles: 2
		});
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Vuelo a Eliminar, Vuelo no encontrado', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarVueloEliminar
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la eliminación de Vuelos, Vuelo eliminado correctamente', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarVueloEliminar, IdVuelo: 3
		});
		expect(response.statusCode).toBe(200);
	});
});
