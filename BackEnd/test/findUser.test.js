const request = require('supertest');
const app = require('../server');

const Perfil = {
	'IdUsuario': 4000
};
const PerfilEditar = {
	'IdUsuario': 4000,
	'Name': 'Prueba Unitaria',
	'Nacimiento': '27/06/2022',
	'Correo': 'PruebasUnitarias.prueba@gmail.com',
	'Pass': 'contra123'
};

const rutaget = '/v1/fullTrip/ViewProfile';
const rutaupdate = '/v1/fullTrip/EditProfile';

describe('POST / Ver Perfil', () => {
	test('debería de responder un status 400, usuario no encontrado', async () => {
		const response = await request(app).post(rutaget).send({ ...Perfil });
		expect(response.statusCode).toBe(400);
	});

	test('debería de responder un status 200 usuario Encontrado', async () => {
		const response = await request(app).post(rutaget).send({ ...Perfil, IdUsuario: 4 });
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 200 usuario Editado exitosamente', async () => {
		const response = await request(app).put(rutaupdate).send({
			...PerfilEditar, IdUsuario: 7
		});
		expect(response.statusCode).toBe(200);
	});
	test('debería de responder un status 400 usuario no encontrado para editar', async () => {
		const response = await request(app).put(rutaupdate).send({
			...PerfilEditar
		});
		expect(response.statusCode).toBe(400);
	});
});
