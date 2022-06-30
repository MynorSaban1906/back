const request = require('supertest');
const app = require('../server');

const Automovil = {
	'Marca': 'Nissan',
	'Placa': '123abc',
	'Modelo': '2015',
	'Precio': '1200.00',
	'FechaDisponible': '30/06/2022',
	'IdServicio': '2',
	'Imagen': 'imagen'
};
const BuscarAutomovil = {
	'IdAutomovil': 4000,
	'Marca': 'Nissan',
	'Placa': '123abc',
	'Modelo': '2015',
	'Precio': '1200.00',
	'FechaDisponible': '30/06/2022',
	'Imagen': 'imagen',
	'Estado': 'Disponible',
	'Activo': 1
};

const BuscarAutomovilEliminar = {
	'IdAutomovil': 4000
};
const ruta = '/v1/fullTrip/CreateAutomovil';
const rutaget = '/v1/fullTrip/ReadAutomovil';
const rutaupdate = '/v1/fullTrip/UpdateAutomovil';
const rutadelete = '/v1/fullTrip/DeleteAutomovil';

describe('POST / RegistroAutomovil', () => {
	test('debería de responder un status 200 el registro de Automovil', async () => {
		const response = await request(app).post(ruta).send({ ...Automovil });
		expect(response.statusCode).toBe(200);
	});

	test('debería de responder un status 400 el registro de Automovil, Marca incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...Automovil, Marca: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Automovil, placa incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Automovil, Placa: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Automovil, Modelo Incorrecto incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...Automovil, Modelo: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Automovil, Precio incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...Automovil, Precio: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Automovil, Fecha disponible incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Automovil, FechaDisponible: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Automovil, Servicio incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Automovil, IdServicio: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Automovil, imagen incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Automovil, Imagen: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 200 la lectura de Automoviles', async () => {
		const response = await request(app).get(rutaget);
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Automoviles, Auto no encontrado', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarAutomovil
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la edicion de Automoviles, Auto editado correctamente', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarAutomovil, IdAutomovil: 11, Marca: 'Chevrolet'
		});
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Automovil a Eliminar, Auto no encontrado', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarAutomovilEliminar
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la eliminación de Automoviles, Auto eliminado correctamente', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarAutomovilEliminar, IdAutomovil: 11
		});
		expect(response.statusCode).toBe(200);
	});
});
