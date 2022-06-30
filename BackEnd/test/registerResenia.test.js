const request = require('supertest');
const app = require('../server');

const Resenia = {
	'Descripcion': 'Esta es mi reseña de prueba unitaria',
	'IdUsuario': 2,
	'IdServicio': 2
};
const BuscarResenia = {
	'IdResenia': 4000,
	'Descripcion': 'Esta es mi reseña de prueba unitaria',
	'IdUsuario': 2,
	'IdServicio': 2
};

const BuscarReseniaEliminar = {
	'IdResenia': 4000
};

const BuscarReseniaServicio = {
	'IdServicio': 4000
};

const ruta = '/v1/fullTrip/CreateResenia';
const rutaget = '/v1/fullTrip/ReadResenia';
const rutaupdate = '/v1/fullTrip/UpdateResenia';
const rutadelete = '/v1/fullTrip/DeleteResenia';
const rutareseniaservicio = '/v1/fullTrip/ReadReseniaServicio';

describe('POST / Registro Resenia', () => {
	test('debería de responder un status 200 el registro de Resenia', async () => {
		const response = await request(app).post(ruta).send({ ...Resenia });
		expect(response.statusCode).toBe(200);
	});

	test('debería de responder un status 400 el registro de Resenia, IdServicio incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...Resenia, IdServicio: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Resenia, Descripcion incorrecta', async () => {
		const response = await request(app).post(ruta).send({
			...Resenia, Descripcion: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 400 el registro de Resenia, IdUsuario incorrecto', async () => {
		const response = await request(app).post(ruta).send({
			...Resenia, IdUsuario: ''
		});
		expect(response.statusCode).toBe(400);
	});
	test('debería de responder un status 200 la lectura de Resenia', async () => {
		const response = await request(app).get(rutaget);
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Resenia, Resenia no encontrado', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarResenia
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la edicion de Resenia, Resenia editado correctamente', async () => {
		const response = await request(app).put(rutaupdate).send({
			...BuscarResenia, IdResenia: 2, Descripcion: 'Edicion de resenia'
		});
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Resenia a Eliminar, Resenia no encontrado', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarReseniaEliminar
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la eliminación de Automoviles, Auto eliminado correctamente', async () => {
		const response = await request(app).put(rutadelete).send({
			...BuscarReseniaEliminar, IdResenia: 2
		});
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 404 la lectura de Resenia por servicio, Resenia no encontrado', async () => {
		const response = await request(app).get(rutareseniaservicio).send({
			...BuscarReseniaServicio
		});
		expect(response.statusCode).toBe(404);
	});
	test('debería de responder un status 200 la lectura de Resenia por servicio, Resenia encontrada', async () => {
		const response = await request(app).get(rutareseniaservicio).send({
			...BuscarReseniaServicio, IdServicio: 1
		});
		expect(response.statusCode).toBe(200);
	});
});
