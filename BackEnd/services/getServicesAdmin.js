const connection = require('../config/connectDb2');

const { getServices, getServicesStatus, AprobarServicio, ModificarServicio } = require('./funtionsDb');

exports.allServices = async (req, res) => {
	const result = await getServices(connection);
	return res.status(200).send(result);
};

exports.service = async (req, res) => {
	const id = req.params.ID;

	if (id != null) {
		const result = await getServices(connection, id);
		if (result !== undefined) {
			return res.status(200).send(result);
		}
		return res.status(200).send('not exist service ');
	}
	return res.status(400).json('not is valid Id');
};

exports.activeService = async (req, res) => {
	const result = await getServicesStatus(connection, 1);
	return res.status(200).send(result);
};

exports.disabledService = async (req, res) => {
	const result = await getServicesStatus(connection, 0);
	return res.status(200).send(result);
};

exports.aprobandoServicios = async (req, res) =>{
	const id = req.body.id
	const estado = req.body.estado
	const result = await AprobarServicio(connection, estado, id);
	return res.status(200).send(result)
}

exports.modificandoServicios = async (req, res) =>{
	console.log(req.body)
	const id = req.body.id
	const nombre = req.body.nombre
	const direccion = req.body.direccion
	const correo = req.body.correo
	const pass = req.body.pass
	const tipo = req.body.tipo
	const result = await ModificarServicio(connection, nombre, correo, pass, direccion, tipo,    id);
	return res.status(200).send(result)
}
